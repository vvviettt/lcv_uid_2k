import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CategoryState, IProduct} from './category.type';
import {API_PROCESS} from '../../enum';
import {
  getAllProductCategory,
  getProductCategory,
  getWishListApi,
  likeOrUnlikeApi,
} from '../../../services/category';
import {RootState} from '../../store';

export const chooseCategory = createAsyncThunk<
  any,
  {categoryId: string; filter?: any},
  {rejectValue: string}
>('category/choose', async ({categoryId, filter}, {rejectWithValue}) => {
  try {
    return await getProductCategory(categoryId, 1, filter ?? {});
  } catch (error) {
    rejectWithValue((error as any).message);
    return;
  }
});
export const getAll = createAsyncThunk<any, any, {rejectValue: string}>(
  'category/getAllProducts',
  async (value, {rejectWithValue}) => {
    try {
      return await getAllProductCategory(1, value?.filter ?? {});
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
export const likeOrUnlike = createAsyncThunk<
  any,
  {productId: string},
  {rejectValue: string}
>('product/likeOrUnlike', async ({productId}, {rejectWithValue}) => {
  try {
    return await likeOrUnlikeApi(productId);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const getWishList = createAsyncThunk<
  any,
  undefined,
  {rejectValue: string}
>('product/getWishList', async (_, {rejectWithValue}) => {
  try {
    return await getWishListApi(1);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const getMoreWishList = createAsyncThunk<
  any,
  undefined,
  {rejectValue: string}
>('product/getMoreWishList', async (_, {rejectWithValue, getState}) => {
  try {
    const page = (getState() as RootState).category.wishlistCurrentPage + 1;
    return await getWishListApi(page);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

const initialState: CategoryState = {
  categorySelectedId: '',
  categorySelected: undefined,
  products: [],
  isGetAll: false,
  currentPage: 1,
  wishlistCurrentPage: 1,
  getListProductsStatus: API_PROCESS.INITIAL,
  totalRecord: 0,
  wishListTotalRecord: 0,
  isLoadMore: API_PROCESS.INITIAL,
  isWishlistLoadMore: API_PROCESS.INITIAL,
  wishList: [],
  wishListId: [],
  getWishListStatus: API_PROCESS.INITIAL,
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

    builder.addCase(likeOrUnlike.pending, (state, {meta}) => {
      state.products = state.products.map(product => {
        if (product.id === meta.arg.productId) {
          return {...product, isLiked: !product.isLiked};
        }
        return product;
      });
      if (meta.arg.productId === state.productSelected?.id) {
        state.productSelected = {
          ...state.productSelected,
          isLiked: !state.productSelected.isLiked,
        };
      }
      state.wishList = state.wishList.map(product => {
        if (product.id === meta.arg.productId) {
          return {...product, isLiked: !product.isLiked};
        }
        return product;
      });
    });

    builder.addCase(getWishList.pending, state => {
      state.getWishListStatus = API_PROCESS.LOADING;
      state.wishList = [];
      state.wishListTotalRecord = 0;
      state.wishlistCurrentPage = 1;
    });
    builder.addCase(getWishList.fulfilled, (state, {payload}) => {
      state.getWishListStatus = API_PROCESS.SUCCESS;
      state.wishList = payload.products;
      state.wishListTotalRecord = payload.totalPage;
    });
    builder.addCase(getWishList.rejected, state => {
      state.getWishListStatus = API_PROCESS.FAIL;
    });
    builder.addCase(getMoreWishList.pending, state => {
      state.isWishlistLoadMore = API_PROCESS.LOADING;
    });
    builder.addCase(getMoreWishList.fulfilled, (state, {payload}) => {
      state.wishlistCurrentPage = state.wishlistCurrentPage + 1;
      state.isWishlistLoadMore = API_PROCESS.SUCCESS;

      const wishlist = [...state.wishList, ...payload.products];
      const resultArray = [];
      const seen = new Set();
      for (const item of wishlist) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          resultArray.push({...item, imageUrls: item.imageUrls ?? []});
        }
      }
      console.log(payload.products[1]);

      state.wishList = resultArray;
    });
    builder.addCase(getMoreWishList.rejected, state => {
      state.isWishlistLoadMore = API_PROCESS.FAIL;
    });
  },
});

export const {selectProduct} = categorySlice.actions;
export default categorySlice.reducer;
