import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CategoryState, IProduct} from './category.type';
import {API_PROCESS} from '../../enum';
import {getProductCategory} from '../../../services/category';

export const chooseCategory = createAsyncThunk<
  any,
  {categoryId: string},
  {rejectValue: string}
>('category/choose', async ({categoryId}, {rejectWithValue}) => {
  try {
    return await getProductCategory(categoryId, 1);
  } catch (error) {
    rejectWithValue((error as any).message);
    return;
  }
});

const initialState: CategoryState = {
  categorySelectedId: '',
  categorySelected: undefined,
  products: [],
  currentPage: 1,
  getListProductsStatus: API_PROCESS.INITIAL,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<{product: IProduct}>) => {
      state.productSelected = action.payload.product;
    },
  },
  extraReducers: builder => {
    builder.addCase(chooseCategory.pending, (state, action) => {
      state.currentPage = 1;
      state.categorySelectedId = action.meta.arg.categoryId;
      state.getListProductsStatus = API_PROCESS.LOADING;
      state.products = [];
      state.categorySelected = undefined;
    });
    builder.addCase(chooseCategory.rejected, state => {
      state.getListProductsStatus = API_PROCESS.FAIL;
    });
    builder.addCase(chooseCategory.fulfilled, (state, {payload}) => {
      state.getListProductsStatus = API_PROCESS.SUCCESS;
      state.products = payload.products;
      state.categorySelected = payload.category;
    });
  },
});

export const {selectProduct} = categorySlice.actions;
export default categorySlice.reducer;
