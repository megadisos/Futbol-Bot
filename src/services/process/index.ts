import Tickets from '../../tickets';
import fs from 'fs';

class Process {
  constructor() {}

  public handleEvents = () => {
    // eslint-disable-next-line no-undef
    process.on('exit', (code) => {
      console.log(`About to exit with code: ${code}`);
      this.saveTickets();
      // Realiza las tareas de limpieza necesarias aquí
    });
    // eslint-disable-next-line no-undef
    process.on('SIGINT', () => {
      console.log('Received SIGINT. Performing cleanup.');
      this.saveTickets();
      // Realiza aquí las tareas de limpieza asíncronas necesarias
      // eslint-disable-next-line no-undef
      process.exit();
    });
    // eslint-disable-next-line no-undef
    process.on('SIGTERM', () => {
      console.log('Received SIGTERM. Performing cleanup.');
      this.saveTickets();
      // Realiza aquí las tareas de limpieza asíncronas necesarias
      // eslint-disable-next-line no-undef
      process.exit();
    });
    // eslint-disable-next-line no-undef
    process.on('uncaughtException', (error) => {
      console.error('Uncaught exception:', error);
      this.saveTickets();
      // Realiza las tareas de limpieza necesarias aquí
      // eslint-disable-next-line no-undef
      process.exit(1); // Sale con un código de error
    });
  };

  private saveTickets = () => {
    const ticketsObj = new Tickets();
    const tickets = ticketsObj.getTicketsArray();
    const jsonTickets = JSON.stringify(tickets);
    const filePath =
      'C:\\Users\\USUARIO\\Documents\\personal\\personal\\desarrollo\\CustomaniaWhatsappBot\\public\\tickets.json';
    try {
      fs.writeFileSync(filePath, jsonTickets);
      console.log('El archivo ha sido guardado.');
    } catch (err) {
      console.error(err);
    }
  };
}

export default Process;
