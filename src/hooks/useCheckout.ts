import {useCallback} from 'react';
import {useReduxSelector} from '../redux/store';

const useCheckout = () => {
  const {products} = useReduxSelector(state => state.cart);

  const getTotalPrice = useCallback(() => {
    return products.reduce((currentValue, product) => {
      const priceAfterDiscount =
        Number(product.product.price) *
        (product.product.discount
          ? (100 - Number(product.product.discount)) / 100
          : 1);
      return currentValue + priceAfterDiscount * (product.quantity ?? 1);
    }, 0);
  }, [products]);

  const priceNonDiscount = useCallback(() => {
    return products.reduce((currentValue, product) => {
      return (
        currentValue + Number(product.product.price) * (product.quantity ?? 1)
      );
    }, 0);
  }, [products]);

  const getVatCost = useCallback(() => {
    return (priceNonDiscount() * 5) / 100;
  }, [priceNonDiscount]);

  const getSum = useCallback(() => {
    return getTotalPrice() + getVatCost();
  }, [getTotalPrice, getVatCost]);

  return {
    getTotalPrice,
    getVatCost,
    getSum,
  };
};

export default useCheckout;
