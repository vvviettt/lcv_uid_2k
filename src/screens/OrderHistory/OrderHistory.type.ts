export interface OrderHistoryItem {
  id: string;
  status: number;
  code: string;
  totalPrice: string;
  createDate: string;
}

export interface OrderItemProps {
  order: OrderHistoryItem;
}
