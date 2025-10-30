import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://192.168.100.9:8022',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
});

export default api;
