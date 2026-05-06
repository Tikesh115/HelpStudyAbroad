import { create } from 'zustand';

import {
  fetchProducts,
  searchProducts,
  fetchProductsByCategory,
} from '@/services/productApi';

interface ProductStore {
  products: any[];
  total: number;
  loading: boolean;

  getProducts: (
    limit?: number,
    skip?: number
  ) => Promise<void>;

  searchProductList: (
    query: string
  ) => Promise<void>;

  filterByCategory: (
    category: string
  ) => Promise<void>;
}

export const useProductStore =
  create<ProductStore>((set) => ({
    products: [],
    total: 0,
    loading: false,

    getProducts: async (
      limit = 10,
      skip = 0
    ) => {
      set({ loading: true });

      try {
        const data =
          await fetchProducts(
            limit,
            skip
          );

        set({
          products: data.products,
          total: data.total,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({ loading: false });
      }
    },

    searchProductList: async (
      query: string
    ) => {
      set({ loading: true });

      try {
        const data =
          await searchProducts(query);

        set({
          products: data.products,
          total: data.total,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({ loading: false });
      }
    },

    filterByCategory: async (
      category: string
    ) => {
      set({ loading: true });

      try {
        const data =
          await fetchProductsByCategory(
            category
          );

        set({
          products: data.products,
          total: data.total,
        });
      } catch (error) {
        console.error(error);
      } finally {
        set({ loading: false });
      }
    },
  }));