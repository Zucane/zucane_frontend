import api from './api.jsx';

export const getAccountHistory = async (accountPublicKey) => {
    try {
        const url = `/api/account/history?account_public_key=${accountPublicKey}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el historial de la cuenta:", error);
        throw error;
    }
};