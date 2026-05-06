import api from './api';

export const fetchProducts = async (
  limit = 10,
  skip = 0
) => {
  const response = await api.get(
    `/products?limit=${limit}&skip=${skip}`
  );

  return response.data;
};

export const searchProducts = async (
  query: string
) => {
  const response = await api.get(
    `/products/search?q=${query}`
  );

  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get(
    '/products/categories'
  );

  return response.data;
};

export const fetchProductsByCategory =
  async (category: string) => {
    const response = await api.get(
      `/products/category/${category}`
    );

    return response.data;
  };

export const fetchSingleProduct = async (
  id: string
) => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
};