// import Data from './src/data';
// import Dates from './src/dates';
import {
  GAMES_URL,
  LEAGUE_TO_FOLLOW,
  PRIMARY_LEAGUE,
} from './src/constants';
import Data from './src/data';
import Dates from './src/dates';
import MessagingConnection from './src/messaging/connection';
import MessagingListening from './src/messaging/listening';
import Request from './src/request';

const start = async () => {
  const newRequest = new Request(GAMES_URL);
  const response = await newRequest.getResponseBody();
  const newData = new Data(response);
  newData.startDataProcessing();
  const newDates = new Dates();

  const dataFiltered = newData.getGamesByFilters({
    date: newDates.formatedCurrentDay(),
    league: LEAGUE_TO_FOLLOW.ALL,
  });
  console.log(
    newData.getStringFromDataObject(
      dataFiltered,
      PRIMARY_LEAGUE,
    ),
  );

  const newMessagingConnection = new MessagingConnection();
  newMessagingConnection.start();
  const client =
    newMessagingConnection.getWebsocketClient();

  const Listener = new MessagingListening(client);
  Listener.onNewMessage();
};

start();
