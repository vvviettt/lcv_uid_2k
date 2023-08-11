import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CategoryState, IProduct} from './category.type';
import {API_PROCESS} from '../../enum';
import {
  getAllProductCategory,
  getProductCategory,
} from '../../../services/category';
import {RootState} from '../../store';

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
export const getAll = createAsyncThunk<any, undefined, {rejectValue: string}>(
  'category/getAllProducts',
  async (_, {rejectWithValue}) => {
    try {
      return await getAllProductCategory(1);
    } catch (error) {
      rejectWithValue((error as any).message);
      return;
    }
  },
);

export const loadMore = createAsyncThunk<any, undefined, {rejectValue: string}>(
  'category/loadMore',
  async (_, {rejectWithValue, getState}) => {
    try {
      const state = getState() as RootState;
      if (state.category.isGetAll) {
        return await getAllProductCategory(state.category.currentPage + 1);
      } else if (state.category.categorySelected) {
        return await getProductCategory(
          state.category.categorySelected.id,
          state.category.currentPage + 1,
        );
      }
      return {
        products: [],
      };
    } catch (error) {
      rejectWithValue((error as any).message);
      return;
    }
  },
);

const initialState: CategoryState = {
  categorySelectedId: '',
  categorySelected: undefined,
  products: [],
  isGetAll: false,
  currentPage: 1,
  getListProductsStatus: API_PROCESS.INITIAL,
  totalRecord: 0,
  isLoadMore: API_PROCESS.INITIAL,
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
      state.isGetAll = false;
      state.totalRecord = 0;
      state.isLoadMore = API_PROCESS.INITIAL;
    });
    builder.addCase(chooseCategory.rejected, state => {
      state.getListProductsStatus = API_PROCESS.FAIL;
    });
    builder.addCase(chooseCategory.fulfilled, (state, {payload}) => {
      state.getListProductsStatus = API_PROCESS.SUCCESS;
      state.products = payload.products;
      state.categorySelected = payload.category;
      state.totalRecord = payload.totalProducts;
    });

    builder.addCase(getAll.pending, state => {
      state.currentPage = 1;
      state.categorySelectedId = '';
      state.getListProductsStatus = API_PROCESS.LOADING;
      state.products = [];
      state.isGetAll = true;
      state.categorySelected = undefined;
    });
    builder.addCase(getAll.rejected, state => {
      state.getListProductsStatus = API_PROCESS.FAIL;
    });
    builder.addCase(getAll.fulfilled, (state, {payload}) => {
      state.getListProductsStatus = API_PROCESS.SUCCESS;
      state.products = payload.products;
      state.totalRecord = payload.totalProducts;
    });
    builder.addCase(loadMore.fulfilled, (state, {payload}) => {
      state.isLoadMore = API_PROCESS.SUCCESS;
      const products = [...state.products, ...payload.products];
      const resultArray = [];
      const seen = new Set();
      for (const item of products) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          resultArray.push(item);
        }
      }
      state.products = resultArray;
    });
    builder.addCase(loadMore.rejected, state => {
      state.isLoadMore = API_PROCESS.FAIL;
    });
    builder.addCase(loadMore.pending, state => {
      state.isLoadMore = API_PROCESS.LOADING;
    });
  },
});

export const {selectProduct} = categorySlice.actions;
export default categorySlice.reducer;
