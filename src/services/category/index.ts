import axios, {AxiosError} from 'axios';
import {IProduct} from '../../redux/slices/category/category.type';
import {ICategory} from '../../redux/slices/static/static.type';
import httpClient from '../httpClient';
import categoryEndPoint from './categoryEndPoint';
import {OderFormProps} from '../../components/forms/OderForm/OderForm.type';
import {OrderHistoryItem} from '../../screens/OrderHistory/OrderHistory.type';
import {OrderDetailItem} from '../../screens/OrderDetail/OrderDetail.type';

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
    await httpClient.get(`${categoryEndPoint.like}/${productId}`);
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
      `${categoryEndPoint.getWishList}/${page}/10000000000`,
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
  products: {
    productId: string;
    quantity: string;
    color?: string;
    size?: string;
  }[],
  type: number,
) => {
  try {
    const rs = await httpClient.post(`${categoryEndPoint.order}`, {
      others: {
        ...checkoutInfo,
        address: `${type === 2 ? 'Work address: ' : 'Home Address: '}Country: ${
          checkoutInfo.country
        }, City: ${checkoutInfo.city}, Area: ${checkoutInfo.area}, Detail: ${
          checkoutInfo.addressDetail
        }  `,
      },
      items: products,
    });
    console.log(rs);

    return;
    // return {products: res.data.results.data, totalRecord: res.data.totalRecord};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw ((error as AxiosError).response?.data as any)?.message ?? '';
    }
    throw 'Unknown  error.';
  }
};

export const getOrderHistoryAPI = async (page?: number) => {
  try {
    const res = await httpClient.get(
      `${categoryEndPoint.historyOrder}/${page ?? 1}/10000000000000`,
    );
    return {
      data: res.data.results.data as OrderHistoryItem,
      totalPage: res.data.results.totalPage,
    };
    // return {products: res.data.results.data, totalRecord: res.data.totalRecord};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        ((error as AxiosError).response?.data as any)?.message ??
        'Unknown  error'
      );
    }
    throw 'Unknown  error.';
  }
};

export const getOrderHistoryDetailAPI = async (id: string) => {
  try {
    const res = await httpClient.get(
      `${categoryEndPoint.historyOrderDetail}/${id}`,
    );
    return res.data.results as OrderDetailItem;
    // return {products: res.data.results.data, totalRecord: res.data.totalRecord};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        ((error as AxiosError).response?.data as any)?.message ??
        'Unknown  error'
      );
    }
    throw 'Unknown  error.';
  }
};

export const cancelOrderAPI = async (id: string) => {
  try {
    console.log(id);

    const res = await httpClient.put(`/order/${id}/cancel`);

    return res.data.results as OrderHistoryItem;
    // return {products: res.data.results.data, totalRecord: res.data.totalRecord};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        ((error as AxiosError).response?.data as any)?.message ??
        'Unknown  error'
      );
    }
    throw 'Unknown  error.';
  }
};

export const createOrderApi = async (
  checkoutInfo: OderFormProps,
  products: {
    productId: string;
    quantity: string;
    color?: string;
    size?: string;
  }[],
  type: number,
) => {
  try {
    const rs = await httpClient.post(`${categoryEndPoint.order}`, {
      others: {
        ...checkoutInfo,
        address: `${type === 2 ? 'Work address: ' : 'Home Address: '}Country: ${
          checkoutInfo.country
        }, City: ${checkoutInfo.city}, Area: ${checkoutInfo.area}, Detail: ${
          checkoutInfo.addressDetail
        }  `,
      },
      items: products,
    });

    return rs.data?.results;
    // return {products: res.data.results.data, totalRecord: res.data.totalRecord};
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(((error as AxiosError).response?.data as any) ?? '');
    }
    console.log('Unknown  error.');
    return null;
  }
};

export const confirmOrderAPI = async (
  orderId: string,
  paymentStatus: number,
) => {
  try {
    console.log(orderId, paymentStatus);

    return await httpClient.put(`/payment/${orderId}`, {
      paymentStatus: paymentStatus,
    });
  } catch (error) {
    throw error;
  }
};

export const getProductDetail = async (productId: string) => {
  try {
    const response = await httpClient.get(
      `${categoryEndPoint.getProductDetail}/${productId}`,
    );
    console.log('Product Detail: ', response.data?.results?.['0']);

    return response.data?.results?.['0'];
  } catch (error) {
    return null;
  }
};
