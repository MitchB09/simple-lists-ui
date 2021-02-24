import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.2.16:3001/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});