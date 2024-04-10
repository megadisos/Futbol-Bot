import axios from 'axios';

class Request {
  public url: string;
  constructor(url) {
    this.url = url;
  }

  public getResponseBody = async () => {
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default Request;
