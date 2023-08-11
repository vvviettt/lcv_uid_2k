import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {CartState} from './cart.type';
import {IProduct} from '../category/category.type';

// export const chooseCategory = createAsyncThunk<
//   any,
//   {categoryId: string},
//   {rejectValue: string}
// >('category/choose', async ({categoryId}, {rejectWithValue}) => {
//   try {
//     return await getProductCategory(categoryId, 1);
//   } catch (error) {
//     rejectWithValue((error as any).message);
//     return;
//   }
// });

const initialState: CartState = {
  products: [],
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
  },
});

export const {addToCart, removeCount, addCount, removeToCart} =
  categorySlice.actions;
export default categorySlice.reducer;
