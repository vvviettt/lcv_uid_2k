import {OrderDetailItem} from '../../../screens/OrderDetail/OrderDetail.type';
import {OrderHistoryItem} from '../../../screens/OrderHistory/OrderHistory.type';
import {API_PROCESS} from '../../enum';
import {IProduct} from '../category/category.type';

export interface CartState {
  products: CartItem[];
  orderStatus: API_PROCESS;
  orders: OrderHistoryItem[];
  historyOrderStatus: API_PROCESS;
  loadMoreHistoryOrderStatus: API_PROCESS;
  orderDetail?: OrderDetailItem;
  historyOrderDetailStatus: API_PROCESS;
  orderPage: number;
  totalOrderPage: number;
}

export interface CartItem {
  product: IProduct;
  size?: string;
  colors?: string;
  quantity: number;
}
