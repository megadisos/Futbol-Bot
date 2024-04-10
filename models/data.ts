export interface DataFilters {
  league?: string;
  date?: string;
}

export interface Game {
  home: string;
  visitor: string;
  league: string;
  hour: string; // O el tipo correcto de hora según tu aplicación
  channel: string;
}

export interface FilteredData {
  [date: string]: Game[];
}
