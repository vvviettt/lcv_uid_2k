import {API_PROCESS} from '../../enum';
import {IProduct} from '../category/category.type';

export interface CartState {
  products: IProduct[];
  orderStatus: API_PROCESS;
}
