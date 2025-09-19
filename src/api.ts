import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://apirest2025umg.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;