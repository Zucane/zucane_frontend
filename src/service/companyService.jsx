import apiV1 from './apiV1';

export const getCompany = async (empresa_id) => {
    const response = await apiV1.get(`/api/v1/empresas/${empresa_id}`);
    return response.data;
};

export const getCompanies = async ({ page = 1, size = 10, status = 'activo' } = {}) => {
    const response = await apiV1.get('/api/v1/empresas', {
      params: { page, size, status },   // <-- aquí va el filtro real
    });
    return response.data; // { empresas, total, page, size }
  };