import axios from 'axios';
const API = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4000',
});

API.interceptors.response.use(
  response => (response ? response.data : {}),
  (error) => {
    console.log(error);
  },
);

export default API;