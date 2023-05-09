import axios from 'axios';

export const ClientApi = axios.create({
    baseURL: 'http://localhost:3001'
})
