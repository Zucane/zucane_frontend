import apiV1 from './apiV1';

export const getCompany = async (empresa_id) => {
    const response = await apiV1.get(`/api/v1/empresas/${empresa_id}`);
    return response.data;
};

