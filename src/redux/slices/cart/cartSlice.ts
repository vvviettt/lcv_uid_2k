import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CartState} from './cart.type';
import {IProduct} from '../category/category.type';
import {OderFormProps} from '../../../components/forms/OderForm/OderForm.type';
import {
  checkoutAPI,
  getOrderHistoryAPI,
  getOrderHistoryDetailAPI,
} from '../../../services/category';
import {RootState} from '../../store';
import {API_PROCESS} from '../../enum';
import {ToastAndroid} from 'react-native';
import {updateOrderAutofill} from '../persist/persistSlice';

export const checkout = createAsyncThunk<
  any,
  {order: OderFormProps; isSave: boolean},
  {rejectValue: string}
>(
  'cart/order',
  async ({order, isSave}, {rejectWithValue, getState, dispatch}) => {
    try {
      if (isSave) {
        dispatch(
          updateOrderAutofill({
            email: order.email,
            name: order.name,
            phone: order.phone,
            address: order.address,
          }),
        );
      }
      const products = (getState() as RootState).cart.products.map(product => {
        return {
          productId: product.product.id,
          quantity: `${product.quantity ?? 1}`,
          color: `${product.colors ?? ''}`,
          size: `${product.size ?? ''}`,
        };
      });

      return await checkoutAPI(order, products);
    } catch (error) {
      return rejectWithValue((error as any).message);
    }
  },
);

export const getOrderHistory = createAsyncThunk<
  any,
  undefined,
  {rejectValue: string}
>('cart/get-order', async (_, {rejectWithValue}) => {
  try {
    return await getOrderHistoryAPI();
  } catch (error) {
    return rejectWithValue((error as any).message);
  }
});

export const loadMoreOrderHistory = createAsyncThunk<
  any,
  undefined,
  {rejectValue: string}
>('cart/load-more-order', async (_, {rejectWithValue, getState}) => {
  try {
    const state = getState() as RootState;
    return await getOrderHistoryAPI(state.cart.orderPage + 1);
  } catch (error) {
    return rejectWithValue((error as any).message);
  }
});

export const getOrderHistoryDetail = createAsyncThunk<
  any,
  {id: string},
  {rejectValue: string}
>('cart/get-order-detail', async ({id}, {rejectWithValue}) => {
  try {
    return await getOrderHistoryDetailAPI(id);
  } catch (error) {
    return rejectWithValue((error as any).message);
  }
});

const initialState: CartState = {
  products: [],
  orderStatus: API_PROCESS.INITIAL,
  historyOrderStatus: API_PROCESS.INITIAL,
  orders: [],
  historyOrderDetailStatus: API_PROCESS.INITIAL,
  orderPage: 1,
  totalOrderPage: 1,
  loadMoreHistoryOrderStatus: API_PROCESS.INITIAL,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{product: IProduct; size?: string; color?: string}>,
    ) => {
      if (
        !state.products.find(item => {
          return item.product.id === action.payload.product.id;
        })
      ) {
        state.products = [
          ...state.products,
          {
            product: action.payload.product,
            colors: action.payload.color,
            size: action.payload.size,
            quantity: 1,
          },
        ];
      }
    },
    removeToCart: (state, action: PayloadAction<{productId: string}>) => {
      state.products = state.products.filter(
        product => product.product.id !== action.payload.productId,
      );
    },
    addCount: (state, action: PayloadAction<{productId: string}>) => {
      state.products = state.products.map(product => {
        if (product.product.id === action.payload.productId) {
          return {
            ...product,
            quantity: !product.quantity ? 1 : product.quantity! + 1,
          };
        }
        return product;
      });
    },
    removeCount: (state, action: PayloadAction<{productId: string}>) => {
      state.products = state.products.map(product => {
        if (
          product.product.id === action.payload.productId &&
          product.quantity > 1
        ) {
          return {...product, quantity: product?.quantity - 1};
        }
        return product;
      });
    },
    clearCartForm: state => {
      state.orderStatus = API_PROCESS.INITIAL;
    },
  },
  extraReducers: builder => {
    builder.addCase(checkout.pending, state => {
      state.orderStatus = API_PROCESS.LOADING;
    });
    builder.addCase(checkout.fulfilled, state => {
      state.orderStatus = API_PROCESS.SUCCESS;
      state.products = [];
    });
    builder.addCase(checkout.rejected, (state, {payload}) => {
      state.orderStatus = API_PROCESS.FAIL;
      ToastAndroid.show(
        payload ?? 'Order fail! Please try again after.',
        ToastAndroid.LONG,
      );
    });
    builder.addCase(getOrderHistory.pending, state => {
      state.historyOrderStatus = API_PROCESS.LOADING;
      state.orderPage = 1;
    });
    builder.addCase(getOrderHistory.fulfilled, (state, {payload}) => {
      state.historyOrderStatus = API_PROCESS.SUCCESS;
      state.orders = payload.data;
      console.log(payload);

      state.totalOrderPage = payload.totalPage;
    });
    builder.addCase(getOrderHistory.rejected, (state, {payload}) => {
      state.historyOrderStatus = API_PROCESS.FAIL;
      state.orders = [];
      ToastAndroid.show(
        payload ?? 'Order fail! Please try again after.',
        ToastAndroid.LONG,
      );
    });

    builder.addCase(loadMoreOrderHistory.pending, state => {
      state.loadMoreHistoryOrderStatus = API_PROCESS.LOADING;
    });
    builder.addCase(loadMoreOrderHistory.fulfilled, (state, {payload}) => {
      state.loadMoreHistoryOrderStatus = API_PROCESS.SUCCESS;
      state.orders = [...state.orders, ...payload.data];
      state.totalOrderPage = payload.totalPage;
      state.orderPage = state.orderPage + 1;
    });
    builder.addCase(loadMoreOrderHistory.rejected, state => {
      state.loadMoreHistoryOrderStatus = API_PROCESS.FAIL;
      state.orderPage = state.orderPage + 1;
    });
    builder.addCase(getOrderHistoryDetail.pending, state => {
      state.historyOrderDetailStatus = API_PROCESS.LOADING;
    });
    builder.addCase(getOrderHistoryDetail.fulfilled, (state, {payload}) => {
      state.historyOrderDetailStatus = API_PROCESS.SUCCESS;
      state.orderDetail = payload;
    });
    builder.addCase(getOrderHistoryDetail.rejected, (state, {payload}) => {
      state.historyOrderDetailStatus = API_PROCESS.FAIL;
      state.orderDetail = undefined;
      ToastAndroid.show(
        payload ?? 'Order fail! Please try again after.',
        ToastAndroid.LONG,
      );
    });
  },
});

export const {addToCart, removeCount, addCount, removeToCart, clearCartForm} =
  categorySlice.actions;
export default categorySlice.reducer;
