import axios, {AxiosError} from 'axios';
import httpClient from '../httpClient';
import {staticEndpoint} from './endpoint';
import {
  IBestSeller,
  ICategory,
  INewArrivals,
} from '../../redux/slices/static/static.type';

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const res = await httpClient.get(staticEndpoint.getAll);

    return Object.values(res.data.results) as ICategory[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};

export const getBessSeller = async (): Promise<IBestSeller[]> => {
  try {
    const res = await httpClient.get(staticEndpoint.getBestSeller);
    return res.data.results.data as IBestSeller[];
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
    return res.data.results.data as INewArrivals[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw Error(((error as AxiosError).response?.data as any)?.message ?? '');
    }
    throw new Error('Unknown  error.');
  }
};
