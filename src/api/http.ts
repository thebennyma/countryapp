import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
});
