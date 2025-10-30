import api from './api';

export const getAssetBalance = async () => {
    const response = await api.get('/api/asset/balance');
    return response.data;
};

export const getBusinessBalance = async () => {
    const response = await api.get('/api/business/balance');
    return response.data;
};

export const postBusinessPurchase = async (asset_amount, business_private_key) => {
    const response = await api.post('/api/business/purchase', { asset_amount, business_private_key });
    return response.data;
};