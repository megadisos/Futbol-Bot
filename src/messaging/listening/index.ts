import { Client } from 'whatsapp-web.js';
import Tickets from '../../tickets';

class Listening {
  client: Client;
  constructor(client) {
    this.client = client;
  }
  public onNewMessage = () => {
    this.client.on('message', async (message) => {
      const tickets = new Tickets();
      tickets.onNewTicket(message);
      console.log(tickets.getTicketsArray());
    });
  };
}

export default Listening;
