import Publications from './src/publications';
import Instagram from './src/instagram';
const start = async () => {
  const publication = new Publications(
    'E:\\Customania\\Otros\\Instagram\\ProductosAPublicar',
    'E:\\Customania\\Otros\\Instagram\\ProductosPublicados',
  );
  console.log(
    '------------INSTAGRAM BOT----------------------',
  );
  await publication.createFiles();
  const files = publication.getFiles();
  if (files.length > 0) {
    const filesNotMultiple =
      publication.getNotMultiplesFiles(files);
    const filesMultiple = publication.getAlbumArray(files);
    const instagram = new Instagram();
    await instagram.LoginOnInstagram();

    // Publish one file
    filesNotMultiple.forEach(async (file) => {
      const result = await instagram.PublishPhoto(
        file.content,
        file.description,
      );

      await instagram.PublishStory(file.content, result);
      publication.moveFile(file.fullName);
    });
    //Publish Album
    filesMultiple.forEach(async (files) => {
      const result = await instagram.PublishCarousel(
        files.content,
        files.description,
      );

      await files.content.forEach(async (file) => {
        await instagram.PublishStory(file, result);
      });

      files.fullNames.forEach((name) => {
        publication.moveFile(name);
      });
    });
  } else console.log('No hay archivos para subir');
};

start();
