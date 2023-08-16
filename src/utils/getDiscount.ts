import {convertPrice} from './convertPrice';

const getDiscount = (price: number, discount?: string) => {
  if (!discount) {
    return convertPrice(price.toString());
  }
  const realPrice = Math.round((price * (100 - Number(discount))) / 100);
  return convertPrice(realPrice.toString());
};
export default getDiscount;
