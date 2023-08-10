import {API_PROCESS} from '../../enum';

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
  bestSeller: IBestSeller[];
  getBestSellerStatus: API_PROCESS;
  newArrivals: IBestSeller[];
  getNewArrivalsStatus: API_PROCESS;
}
