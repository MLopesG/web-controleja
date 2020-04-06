import axios from 'axios';

let token = localStorage.getItem('token');

const instance = axios.create({
  baseURL:'http://api-finac.herokuapp.com',
  headers: {
    "Content-Type": "application/json",
    "Authorization": token
  }
});

export default instance;