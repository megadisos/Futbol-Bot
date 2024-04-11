import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { CLIENT_ID } from './constants';

class MessagingConnection {
  public websocketClient: Client;
  constructor() {
    this.websocketClient = new Client({
      authStrategy: new LocalAuth({
        clientId: CLIENT_ID,
      }),
      webVersionCache: {
        type: 'remote',
        remotePath:
          'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
      },
    });
  }

  private generateQRCode = () => {
    this.websocketClient.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });
  };

  private connectionIsReady = () => {
    this.websocketClient.on('ready', () => {
      console.log('Client is ready!');
    });
  };

  public start = () => {
    this.websocketClient.initialize();
    this.generateQRCode();
    this.connectionIsReady();
  };

  public getWebsocketClient = () => {
    return this.websocketClient;
  };
}

export default MessagingConnection;
