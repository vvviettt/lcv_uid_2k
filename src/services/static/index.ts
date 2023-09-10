import axios, {AxiosError} from 'axios';
import httpClient from '../httpClient';
import {staticEndpoint} from './endpoint';
import {ICategory, INewArrivals} from '../../redux/slices/static/static.type';
import {IProduct} from '../../redux/slices/category/category.type';

export const getCategories = async (
  page: number,
): Promise<{categories: ICategory[]}> => {
  try {
    const res = await httpClient.get(`${staticEndpoint.getAll}/${page}/10`);

    return {categories: Object.values(res.data.results) as ICategory[]};
  } catch (error) {
    console.log('ERR', error);

    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};

export const getBessSeller = async (
  page: number,
): Promise<{products: IProduct[]; totalRecord: number}> => {
  try {
    const res = await httpClient.get(
      `${staticEndpoint.getBestSeller}/${page}/5`,
    );
    return {
      products: res.data.results.data as IProduct[],
      totalRecord: res.data.results.totalRecord as number,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};

export const getNewArrivals = async (): Promise<INewArrivals[]> => {
  try {
    const res = await httpClient.get(staticEndpoint.getNewArrivals);
    console.log('hello', res.data);
    return res.data.results.data as INewArrivals[];
  } catch (error) {
    console.log((error as AxiosError).response?.data);

    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};
