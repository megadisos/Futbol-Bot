import { Client } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
const websocketClient = new Client({});

websocketClient.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

websocketClient.on('ready', () => {
  console.log('Client is ready!');
});

export default websocketClient;
