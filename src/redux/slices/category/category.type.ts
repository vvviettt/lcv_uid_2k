import {API_PROCESS} from '../../enum';
import {ICategory} from '../static/static.type';

export interface IProduct {
  id: string;
  name: string;
  imageUrls: string[];
  imageUrl: string;
  price: string;
  description?: string;
  details?: string;
  count?: number;
  isLiked?: boolean;
  discount?: string;
  type?: number;
  sizes: {
    key: string;
    value: string;
  }[];
  colors: {
    name: string;
  }[];
}

export interface CategoryState {
  products: IProduct[];
  getListProductsStatus: API_PROCESS;
  currentPage: number;
  categorySelectedId: string;
  categorySelected?: ICategory;
  productSelected?: IProduct;
  isGetAll: boolean;
  totalRecord: number;
  isLoadMore: API_PROCESS;
  wishList: IProduct[];
  getWishListStatus: API_PROCESS;
  wishListId: string[];
  wishListTotalRecord: number;
  wishlistCurrentPage: number;
  isWishlistLoadMore: API_PROCESS;
  getProductDetailStatus: API_PROCESS;
}
