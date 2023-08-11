import {API_PROCESS} from '../../enum';
import {IProduct} from '../category/category.type';

export interface ICategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface IBestSeller {
  id: string;
  name: string;
  imageUrls: string[];
  price: string;
}

export interface INewArrivals {
  id: string;
  imageUrls: string[];
}

export interface CategoryState {
  categories: ICategory[];
  getCategoriesStatus: API_PROCESS;
  bestSeller: IProduct[];
  getBestSellerStatus: API_PROCESS;
  newArrivals: IBestSeller[];
  getNewArrivalsStatus: API_PROCESS;
}
