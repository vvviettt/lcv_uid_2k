import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CartState} from './cart.type';
import {IProduct} from '../category/category.type';
import {OderFormProps} from '../../../components/forms/OderForm/OderForm.type';
import {checkoutAPI} from '../../../services/category';
import {RootState} from '../../store';
import {API_PROCESS} from '../../enum';
import {ToastAndroid} from 'react-native';

export const checkout = createAsyncThunk<
  any,
  OderFormProps,
  {rejectValue: string}
>('cart/order', async (order, {rejectWithValue, getState}) => {
  try {
    const products = (getState() as RootState).cart.products.map(product => {
      return {
        productId: product.id,
        quantity: `${product.count ?? 1}`,
      };
    });

    return await checkoutAPI(order, products);
  } catch (error) {
    rejectWithValue((error as any).message);
    return;
  }
});

const initialState: CartState = {
  products: [],
  orderStatus: API_PROCESS.INITIAL,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{product: IProduct}>) => {
      if (
        !state.products.find(item => {
          return item.id === action.payload.product.id;
        })
      ) {
        state.products = [
          ...state.products,
          {...action.payload.product, count: 1},
        ];
      }
    },
    removeToCart: (state, action: PayloadAction<{productId: string}>) => {
      state.products = state.products.filter(
        product => product.id !== action.payload.productId,
      );
    },
    addCount: (state, action: PayloadAction<{productId: string}>) => {
      state.products = state.products.map(product => {
        if (product.id === action.payload.productId) {
          return {...product, count: !product.count ? 1 : product.count! + 1};
        }
        return product;
      });
    },
    removeCount: (state, action: PayloadAction<{productId: string}>) => {
      state.products = state.products.map(product => {
        if (product.id === action.payload.productId && product.count) {
          return {...product, count: product?.count - 1};
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
  },
});

export const {addToCart, removeCount, addCount, removeToCart, clearCartForm} =
  categorySlice.actions;
export default categorySlice.reducer;
