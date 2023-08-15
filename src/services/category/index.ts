import axios, {AxiosError} from 'axios';
import {IProduct} from '../../redux/slices/category/category.type';
import {ICategory} from '../../redux/slices/static/static.type';
import httpClient from '../httpClient';
import categoryEndPoint from './categoryEndPoint';
import {getState} from '../../redux/store';
import {OderFormProps} from '../../components/forms/OderForm/OderForm.type';

export const getProductCategory = async (
  categoryId: string,
  page: number,
  filter?: any,
) => {
  try {
    const res = await httpClient.post(`${categoryEndPoint.getProducts}`, {
      page,
      categoryId,
      pageSize: 10,
      ...filter,
    });
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

export const getAllProductCategory = async (page: number, filter?: any) => {
  try {
    const res = await httpClient.post(`${categoryEndPoint.getAllProducts}`, {
      page,
      pageSize: 10,
      ...filter,
    });
    const data = res.data.results;
    return {products: data.data as IProduct[], totalProducts: data.totalRecord};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};

export const likeOrUnlikeApi = async (productId: string) => {
  try {
    const res = await httpClient.get(`${categoryEndPoint.like}/${productId}`);
    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};

export const getWishListApi = async (page: number) => {
  try {
    const res = await httpClient.get(
      `${categoryEndPoint.getWishList}/${page}/10`,
    );

    return {
      products: res.data.results.data,
      totalPage: res.data.results.totalPage,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw ((error as AxiosError).response?.data as any)?.message ?? '';
    }
    throw 'Unknown  error.';
  }
};

export const checkoutAPI = async (
  checkoutInfo: OderFormProps,
  products: {productId: string; quantity: string}[],
) => {
  try {
    await httpClient.post(`${categoryEndPoint.order}`, {
      user: checkoutInfo,
      items: products,
    });
    return;
    // return {products: res.data.results.data, totalRecord: res.data.totalRecord};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw ((error as AxiosError).response?.data as any)?.message ?? '';
    }
    throw 'Unknown  error.';
  }
};
