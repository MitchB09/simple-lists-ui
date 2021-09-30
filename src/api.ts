import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sje4kpvmo5.execute-api.us-east-1.amazonaws.com/dev',
  // baseURL: 'http://192.168.2.16:3001/',
  timeout: 5000,
});

export default api;
