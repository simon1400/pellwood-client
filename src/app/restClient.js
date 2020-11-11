import axios from 'axios'

export const API_ENDPOINT = process.env.REACT_APP_API

export const AxiosAPI = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})


// // Add a response interceptor
// AxiosAPI.interceptors.response.use((response) => {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   console.log('error.response', error.response)
//   if (error?.response?.status === 401) {
//     localStorage.clear();
//     window.location.href = AUTH_URL
//   }
//   return Promise.reject(error)
// })
//
// AxiosAPI.interceptors.request.use((request) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     request.headers['Authorization'] = 'Bearer ' + token
//   }
//   return request;
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // Do something with response error
//   console.log(error)
//   return Promise.reject(error)
// })
