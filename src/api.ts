import axios from 'axios';
// Configura la instancia de Axios con la URL base de tu API REST
const apiClient = axios.create({
    baseURL: 'http://localhost:8081/api/customer',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;