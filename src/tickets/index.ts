import { ticket, ticketStatus } from '../../models/tickets';
import fs from 'fs';

class Tickets {
  constructor() {}
  static getTicketsFromFile = () => {
    const filePath =
      'C:\\Users\\USUARIO\\Documents\\personal\\personal\\desarrollo\\CustomaniaWhatsappBot\\public\\tickets.json';
    try {
      // Leer el contenido del archivo de forma sincrónica
      const rawData = fs.readFileSync(filePath, 'utf8');
      // Convertir la cadena JSON en un objeto JavaScript
      const data = JSON.parse(rawData);
      return data;
    } catch (error) {
      console.error(
        `Error reading or parsing the file: ${error}`,
      );
      return []; // O maneja el error de la manera que prefieras
    }
  };
  static ticketsArray: ticket[] = this.getTicketsFromFile();

  public onNewTicket = (newMessage) => {
    const id = newMessage._data.from;
    const ticket = Tickets.ticketsArray.find(
      (ticket) => ticket.id === id,
    );

    if (ticket) {
      Tickets.ticketsArray = Tickets.ticketsArray.filter(
        (ticket) => ticket.id !== id,
      );
    }
    this.addTicket(newMessage);
  };

  private addTicket = (newMessage) => {
    const newTicket = this.createTicketFromMessage(
      newMessage,
      'open',
    );
    Tickets.ticketsArray.push(newTicket);
  };

  private createTicketFromMessage = (
    newMessage,
    status: ticketStatus,
  ) => {
    const id = newMessage._data.from;
    const name = newMessage._data.notifyName;
    const number = newMessage._data.from.split('@')[0];
    const user = name ? name : number;
    const msg = newMessage.body;

    return { id, user, number, msg, status };
  };

  public getTicketsArray = () => {
    return Tickets.ticketsArray;
  };
}

export default Tickets;
