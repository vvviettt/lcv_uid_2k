import axios, {AxiosError} from 'axios';
import {IProduct} from '../../redux/slices/category/category.type';
import {ICategory} from '../../redux/slices/static/static.type';
import httpClient from '../httpClient';
import categoryEndPoint from './categoryEndPoint';

export const getProductCategory = async (productId: string, page: number) => {
  try {
    const res = await httpClient.get(
      `${categoryEndPoint.getProducts}/${productId}/${page}/10`,
    );
    const data = res.data.results.data;
    return {
      category: data.category as ICategory,
      products: data.products as IProduct[],
      totalProducts: res.data.results.totalRecord as number,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};

export const getAllProductCategory = async (page: number) => {
  try {
    const res = await httpClient.get(
      `${categoryEndPoint.getAllProducts}/${page}/10`,
    );
    const data = res.data.results;
    return {products: data.data as IProduct[], totalProducts: data.totalRecord};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};
