import Publications from './src/publications';

const start = async () => {
  const publication = new Publications(
    'E:\\Customania\\Otros\\Instagram\\ProductosAPublicar',
  );
  await publication.createFiles();
  const files = publication.getFiles();
  console.log(files);
};

start();
