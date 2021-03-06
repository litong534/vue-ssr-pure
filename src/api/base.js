import axios from 'axios';

if(process.env.NODE_ENV === 'production') {
  var base = axios.create({
    // baseURL: 'http://localhost:3001/api/',
    baseURL: 'http://47.95.250.143:3000/api/',
    timeout: 10000
  });
}else {
  var base = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 10000
  });
}

// base.interceptors.request.use(
//   config => {
//     if (window.localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//       config.headers['x-access-token'] = `${window.localStorage.getItem('token')}`;
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   });
export default base;