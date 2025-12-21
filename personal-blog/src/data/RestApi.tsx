import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
export const TIMEOUT =  5 * 60 * 1000

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
