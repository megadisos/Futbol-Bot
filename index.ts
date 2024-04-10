import Data from './src/data';
import Dates from './src/dates';
import Request from './src/request';

// websocketClient.initialize();
// const listening = new Listening(websocketClient);

// listening.onNewMessage();
// const process = new Process();
// process.handleEvents();

const start = async () => {
  const newRequest = new Request(
    'https://www.futbolred.com/parrilla-de-futbol',
  );
  const response = await newRequest.getResponseBody();
  const newData = new Data(response);
  newData.startDataProcessing();
  const newDates = new Dates();

  const dataFiltered = newData.getGamesByFilters({
    date: newDates.formatedCurrentDay(),
    league: 'All',
  });
  console.log(dataFiltered);
};

start();
