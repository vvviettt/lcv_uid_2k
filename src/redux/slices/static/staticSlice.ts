import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CategoryState} from './static.type';
import {API_PROCESS} from '../../enum';
import {
  getBessSeller,
  getCategories,
  getNewArrivals as getNewArrivalsApi,
} from '../../../services/static';

const initialState: CategoryState = {
  categories: [],
  getCategoriesStatus: API_PROCESS.INITIAL,
  bestSeller: [],
  getBestSellerStatus: API_PROCESS.INITIAL,
  newArrivals: [],
  getNewArrivalsStatus: API_PROCESS.INITIAL,
};

export const getAllCategories = createAsyncThunk<
  any,
  undefined,
  {rejectValue: string}
>('category/getAll', async (unknown, {rejectWithValue}) => {
  try {
    return await getCategories(1);
  } catch (error) {
    return rejectWithValue((error as any).message);
  }
});

export const getBestSeller = createAsyncThunk<
  any,
  undefined,
  {rejectValue: string}
>('static/getBessSeller', async (unknown, {rejectWithValue}) => {
  try {
    return await getBessSeller(1);
  } catch (error) {
    return rejectWithValue((error as any).message);
  }
});

export const getNewArrivals = createAsyncThunk<
  any,
  undefined,
  {rejectValue: string}
>('static/getNewArrivals', async (unknown, {rejectWithValue}) => {
  try {
    return await getNewArrivalsApi();
  } catch (error) {
    return rejectWithValue((error as any).message);
  }
});

const staticSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllCategories.pending, state => {
      state.getCategoriesStatus = API_PROCESS.LOADING;
    });
    builder.addCase(getAllCategories.fulfilled, (state, {payload}) => {
      state.getCategoriesStatus = API_PROCESS.SUCCESS;
      state.categories = payload.categories;
    });
    builder.addCase(getAllCategories.rejected, state => {
      state.getCategoriesStatus = API_PROCESS.FAIL;
    });

    builder.addCase(getBestSeller.pending, state => {
      state.getBestSellerStatus = API_PROCESS.LOADING;
    });
    builder.addCase(getBestSeller.fulfilled, (state, {payload}) => {
      state.getBestSellerStatus = API_PROCESS.SUCCESS;
      state.bestSeller = payload.products;
    });
    builder.addCase(getBestSeller.rejected, state => {
      state.getBestSellerStatus = API_PROCESS.FAIL;
    });

    builder.addCase(getNewArrivals.pending, state => {
      state.getNewArrivalsStatus = API_PROCESS.LOADING;
    });
    builder.addCase(getNewArrivals.fulfilled, (state, {payload}) => {
      state.getNewArrivalsStatus = API_PROCESS.SUCCESS;
      state.newArrivals = payload;
    });
    builder.addCase(getNewArrivals.rejected, state => {
      state.getNewArrivalsStatus = API_PROCESS.FAIL;
    });
  },
});

export const {} = staticSlice.actions;
export default staticSlice.reducer;
