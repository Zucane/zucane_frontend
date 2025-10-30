import api from './api';

export const getAssetBalance = async () => {
    const response = await api.get('/api/asset/balance');
    return response.data;
};

export const getBusinessBalance = async (accountPublicKey) => {
    try {
        const url = `/api/business/balance?account_public_key=${accountPublicKey}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el balance de la empresa:", error);
        throw error;
    }
};

export const postBusinessPurchase = async (asset_amount, business_private_key) => {
    const response = await api.post('/api/business/purchase', { asset_amount, business_private_key });
    return response.data;
};