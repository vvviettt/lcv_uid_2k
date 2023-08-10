import {API_PROCESS} from '../../enum';
import {ICategory} from '../static/static.type';

export interface IProduct {
  id: string;
  name: string;
  imageUrls: string[];
  price: string;
}

export interface CategoryState {
  products: IProduct[];
  getListProductsStatus: API_PROCESS;
  currentPage: number;
  categorySelectedId: string;
  categorySelected?: ICategory;
  productSelected?: IProduct;
}
