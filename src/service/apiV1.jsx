import axios from 'axios'

const apiV1 = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://192.168.100.8:8000',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
});

export default apiV1;