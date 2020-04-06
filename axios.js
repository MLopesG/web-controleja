import axios from 'axios';

const instance = axios.create({
    baseURL:'http://api-finac.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;