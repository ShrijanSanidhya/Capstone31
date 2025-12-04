import axios from 'axios';

const api = axios.create({
    baseURL: 'https://tripplanner-8pge.onrender.com/api',
    withCredentials: true,
});

export default api;
