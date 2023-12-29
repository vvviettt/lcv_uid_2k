export interface OrderHistoryItem {
  id: string;
  status: number;
  code: string;
  totalPrice: string;
  createDate: string;
  taxes: string;
}

export interface OrderItemProps {
  order: OrderHistoryItem;
  handleCancel: (id: string) => void;
}
