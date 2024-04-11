import { Client } from 'whatsapp-web.js';

class MessagingSender {
  client: Client;
  constructor(client) {
    this.client = client;
  }

  public sendNewMessage = (chatId, message) => {
    this.client.sendMessage(chatId, message);
  };
}

export default MessagingSender;
