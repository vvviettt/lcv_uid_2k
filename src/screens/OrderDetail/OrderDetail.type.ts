export interface OrderDetailItemProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
  colors: string;
  sizes: string;
}

export interface OrderDetailItem {
  others: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  detail: OrderDetailItemProduct[];
}
