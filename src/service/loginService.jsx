import api from './api';

export const login = async (email, password) => {
    try {
        const response = await api.post('/api/v1/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};