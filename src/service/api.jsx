import React from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://apis-accounts.onrender.com',
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
});

export default api;
