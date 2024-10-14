import { IgApiClient } from 'instagram-private-api';
import dotenv from 'dotenv';

class Instagram {
  ig: IgApiClient;

  constructor() {
    dotenv.config();
  }

  public LoginOnInstagram = async () => {
    try {
      this.ig = new IgApiClient();
      this.ig.state.generateDevice(process.env.IG_USERNAME);
      await this.ig.account.login(
        process.env.IG_USERNAME,
        process.env.IG_PASSWORD,
      );
      console.log('Logueo en instagram exitoso');
    } catch (error) {
      console.log('ERROR:' + error);
    }
  };

  public PublishPhoto = async (
    image: Buffer,
    description: string,
  ) => {
    try {
      const result = await this.ig.publish.photo({
        file: image,
        caption: description,
      });
      console.log('La foto fue publicada!');
      return result.media.code;
    } catch (error) {
      console.log('ERROR:' + error);
      return '';
    }
  };

  public PublishCarousel = async (
    images: Buffer[],
    description: string,
  ) => {
    try {
      const items = images.map((image) => ({
        file: image,
      }));

      const result = await this.ig.publish.album({
        items,
        caption: description,
      });
      console.log('El carrousel fue publciado');
      return result.media.code;
    } catch (error) {
      console.log('ERROR: ' + error);
      return '';
    }
  };

  public PublishStory = async (
    file: Buffer,
    id: string,
  ) => {
    try {
      await this.ig.publish.story({
        file,
        link: `https://www.instagram.com/p/${id}/`,
      });
      console.log('La historia fue publicada');
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  };
}

export default Instagram;
