import axios from 'axios'

const fallbackBaseURL = (() => {
    try {
        return 'http://192.168.100.8:8000'
    } catch {}
    return 'http://192.168.100.8:8000';
})();

const apiV1 = axios.create({
    baseURL: import.meta.env.VITE_API_URL || fallbackBaseURL,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
});

export default apiV1;