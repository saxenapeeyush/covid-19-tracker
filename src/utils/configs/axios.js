import axios from 'axios';

export const Instance = axios.create(
  {

  baseURL: 'https://api.covid19india.org',

});
