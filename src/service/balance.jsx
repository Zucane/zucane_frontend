import api from './api';

export const getAssetBalance = async () => {
    const response = await api.get('/api/asset/balance');
    return response.data;
};

export const getBusinessBalance = async (accountPublicKey) => {
    try {
        const url = `/api/account/balance?account_public_key=${accountPublicKey}`;
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el balance de la empresa:", error);
        throw error;
    }
};

export const postBusinessPurchase = async (asset_amount, business_private_key) => {
    const response = await api.post('/api/business/purchase', { asset_amount, business_private_key }, { responseType: 'blob' });

    // Retorna el blob y el nombre sugerido por el servidor
    const blob = new Blob([response.data], { type: 'application/pdf' });

  // Intentamos obtener el nombre del archivo desde los headers
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'purchase_invoice.pdf';
    if (contentDisposition) {
    const match = contentDisposition.match(/filename="?(.+)"?/);
    if (match && match[1]) filename = match[1];
}

return { blob, filename };
};