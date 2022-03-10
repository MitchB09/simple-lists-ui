import axios from 'axios';

const api = axios.create({
  baseURL: ' https://7htm412c60.execute-api.us-east-1.amazonaws.com/dev',
  timeout: 5000,
});

export default api;
