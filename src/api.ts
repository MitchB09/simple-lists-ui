import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.2.16:3001/',
  timeout: 5000,
});

/*
axios.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = 
  },
  (error) =>
    // Do something with request error
    Promise.reject(error),
);
*/
/*
api.interceptors.request.use((config) => {
  await Auth.currentSession()
    .then((res: any) => {
      const accessToken = res.getAccessToken();
      const jwt = accessToken.getJwtToken();
      console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
      console.log(`myJwt: ${jwt}`);

      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = jwt ? `Bearer ${jwt}` : '';
      return config;
    })
    .catch((err) => {
      console.dir('Error Getting Session: ', err);
      return config;
    });
});
*/

export default api;
