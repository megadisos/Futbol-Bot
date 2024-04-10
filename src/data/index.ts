import * as cheerio from 'cheerio';
import { TABLE_GAMES_CLASS_NAME } from './constants';
import {
  DataFilters,
  FilteredData,
  Game,
} from '../../models/data';

class Data {
  public requestData;
  public tables: cheerio.Cheerio<cheerio.Element>;
  public dataObject;
  public $;
  constructor(requestData) {
    this.requestData = requestData;
  }

  private getTablesGames = () => {
    this.$ = cheerio.load(this.requestData);
    this.tables = this.$(`.${TABLE_GAMES_CLASS_NAME}`);
  };

  private createDataObject = () => {
    const newObject = {};

    this.tables.each((index, element) => {
      const tableKey = this.$(element).find('th.partido');
      // eslint-disable-next-line no-prototype-builtins
      if (!(tableKey in newObject)) {
        newObject[tableKey.text()] = [];
      }

      const partidos = this.$(element).find('td.partido');
      const ligas = this.$(element).find('td.liga');
      const hours = this.$(element).find('td.hora');
      const channels = this.$(element).find('td.canal');
      partidos.each((index, element) => {
        newObject[tableKey.text()].push({
          home: this.$(element)
            .find('span.escudo-icon-local')
            .text()
            .replace(/[\n\r\s]+/g, ''),
          visitor: this.$(element)
            .find('span.escudo-icon-visitante')
            .text()
            .replace(/[\n\r\s]+/g, ''),
          league: ligas.eq(index).text(),
          hour: hours.eq(index).text(),
          channel: channels.eq(index).text(),
        });
      });
    });

    this.dataObject = newObject;
  };
  public startDataProcessing = () => {
    this.getTablesGames();
    this.createDataObject();
  };

  public getGamesByFilters = (filters: DataFilters) => {
    let filteredData: FilteredData = { ...this.dataObject };

    // Filtrar por fecha si se proporciona
    if (filters.date) {
      filteredData = {
        [filters.date]: this.dataObject[filters.date],
      };
    }

    // Filtrar por liga si se proporciona
    if (filters.league && filters.league !== 'All') {
      const partidosFiltrados: FilteredData = {};

      // Iterar sobre cada fecha y filtrar los partidos por liga
      for (const [fecha, partidosEnFecha] of Object.entries(
        filteredData,
      )) {
        const partidosDeLiga = partidosEnFecha.filter(
          (partido: Game) =>
            partido.league === filters.league,
        );
        if (partidosDeLiga.length > 0) {
          partidosFiltrados[fecha] = partidosDeLiga;
        }
      }

      filteredData = partidosFiltrados;
    }

    return filteredData;
  };
  public getDataObject = () => {
    return this.dataObject;
  };
}

export default Data;
