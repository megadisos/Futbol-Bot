import { Client } from 'whatsapp-web.js';

class MessagingListening {
  client: Client;
  constructor(client) {
    this.client = client;
  }
  public onNewMessage = () => {
    this.client.on('message', async (message) => {
      console.log(message);
    });
  };
}

export default MessagingListening;
