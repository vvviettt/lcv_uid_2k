import {API_PROCESS} from '../../enum';
import {ICategory} from '../static/static.type';

export interface IProduct {
  id: string;
  name: string;
  imageUrls: string[];
  imageUrl: string;
  price: string;
  description?: string;
  count?: number;
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
}
