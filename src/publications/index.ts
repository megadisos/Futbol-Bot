import { readdir, readFile } from 'fs/promises';
import { extname, join } from 'path';

interface fileData {
  name: string;
  content: Buffer;
  fullPath: string;
  description: string;
  isMultiple: boolean;
}
class Publications {
  location: string;
  files: fileData[];
  constructor(location) {
    this.location = location;
  }
  public createFiles = async () => {
    try {
      // Leer los archivos y directorios
      const dirEntries = await readdir(this.location, {
        withFileTypes: true,
      });

      // Filtrar solo archivos y leer su contenido
      const filesArray = await Promise.all(
        dirEntries
          .filter(
            (dirent) =>
              dirent.isFile() &&
              this.isImageFile(dirent.name),
          ) // Filtrar solo los archivos
          .map(async (dirent) => {
            const filePath = join(
              this.location,
              dirent.name,
            );
            const fileContent = await readFile(filePath); // Leer el archivo
            const name = dirent.name
              .split('#')[0]
              .split('-')[1];
            return {
              name: name,
              content: fileContent,
              fullPath: filePath,
              description: this.getDescription(dirent.name),
              isMultiple: dirent.name
                .split('#')[0]
                .endsWith('$'),
            };
          }),
      );
      this.files = filesArray;
    } catch (err) {
      console.error('Error al leer los archivos:', err);
    }
  };

  private getDescription = (name: string) => {
    const nameArray = name.split('#');
    const isMultiple = nameArray[0].endsWith('$');
    const type = nameArray[0].split('-')[0];
    const preName = nameArray[0].split('-')[1];
    // eslint-disable-next-line multiline-ternary
    const finalName = isMultiple
      ? // eslint-disable-next-line multiline-ternary, indent
        preName.slice(0, -2)
      : preName;
    // eslint-disable-next-line multiline-ternary
    const hastagArray = nameArray[1]
      ? // eslint-disable-next-line multiline-ternary, indent
        nameArray[1].split('-')
      : [];

    switch (type.toLowerCase()) {
      case 'hd': // Hoodies
        return this.getHoddiesText(
          finalName,
          hastagArray,
          isMultiple,
        );
      case 'cm': // Camisetas
        return this.getTshirtText(
          finalName,
          hastagArray,
          isMultiple,
        );
      case 'go': // Gorras
        return this.getHatText(
          finalName,
          hastagArray,
          isMultiple,
        );
      case 'mg': // Mugs
        return this.getMugText(
          finalName,
          hastagArray,
          isMultiple,
        );
      case 'tm': // Termos
        return this.getCarimanolaText(
          finalName,
          hastagArray,
          isMultiple,
        );
      case 'st': // Stickers
        return this.getStickersText(
          finalName,
          hastagArray,
          isMultiple,
        );
      case 'pd': // Pendones
        return this.getBannerText(
          finalName,
          hastagArray,
          isMultiple,
        );
      case 'mp': // Microperforados
        return this.getMicroVinylText(
          finalName,
          hastagArray,
          isMultiple,
        );
      case 'vn': // Vinilos
        return this.getVinylText(
          finalName,
          hastagArray,
          isMultiple,
        );
      default:
        break;
    }
  };

  public getFiles = () => this.files;
  // Función auxiliar para verificar si el archivo es de tipo imagen
  private isImageFile = (fileName) => {
    const ext = extname(fileName).toLowerCase();
    return (
      ext === '.png' || ext === '.jpg' || ext === '.jpeg'
    );
  };

  public getHoddiesText = (
    productName: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line space-infix-ops, multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estos buzos personalizados'
        : 'Que tal este buzo personalizado'
    }  ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídelo en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        const filterElement = element.split('.')[0];
        message += `#${filterElement}\n`;
      });
    }

    return message;
  };

  private getTshirtText = (
    productName: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estas camisetas personalizadas'
        : 'Que tal esta camiseta personalizada'
    }  ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídela en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        message += `#${element}\n`;
      });
    }

    return message;
  };

  private getHatText = (
    productName: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estas gorras personalizadas'
        : 'Que tal esta gorra personalizada'
    } ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídela en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        message += `#${element}\n`;
      });
    }

    return message;
  };

  private getMugText = (
    productName: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estos mugs personalizados'
        : 'Que tal este mug personalizado'
    } ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídela en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        message += `#${element}\n`;
      });
    }

    return message;
  };

  private getBannerText = (
    productName: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estos pendones personalizados'
        : 'Que tal este pendon personalizado'
    } ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídela en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        message += `#${element}\n`;
      });
    }

    return message;
  };

  private getStickersText = (
    productName: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estos stickers personalizados'
        : 'Que tal este sticker personalizado'
    }  ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídela en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        message += `#${element}\n`;
      });
    }

    return message;
  };

  private getCarimanolaText = (
    productName: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estas carimañolas personalizadas'
        : 'Que tal esta carimañola personalizada'
    }  ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídela en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        message += `#${element}\n`;
      });
    }

    return message;
  };

  private getVinylText = (
    productName: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estos vinilos personalizados'
        : 'Que tal este vinilo personalizado'
    } ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídela en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        message += `#${element}\n`;
      });
    }

    return message;
  };

  private getMicroVinylText = (
    productName?: string,
    htArray?: string[],
    isMultiple?: boolean,
  ) => {
    let message = ` ${
      // eslint-disable-next-line multiline-ternary
      isMultiple && isMultiple
        ? // eslint-disable-next-line multiline-ternary, indent
          'Que tal estos microperforados personalizados'
        : 'Que tal este microperforado personalizado'
    }   ${
      productName ? `de ${productName},` : null
    } para uno de nuestros clientes, pídela en cualquier color y diseño, ¡Que estás esperando!\n`;

    if (htArray) {
      htArray.forEach((element) => {
        message += `#${element}\n`;
      });
    }

    return message;
  };
}

export default Publications;
