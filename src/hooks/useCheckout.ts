import {useCallback} from 'react';
import {useReduxSelector} from '../redux/store';

const useCheckout = () => {
  const {products} = useReduxSelector(state => state.cart);

  const getTotalPrice = useCallback(() => {
    return products.reduce((currentValue, product) => {
      const priceAfterDiscount = Math.round(
        Number(product.product.price) *
          (product.product.discount
            ? (100 - Number(product.product.discount)) / 100
            : 1),
      );
      return currentValue + priceAfterDiscount * (product.quantity ?? 1);
    }, 0);
  }, [products]);

  const getVatCost = useCallback(() => {
    return Math.round((getTotalPrice() * 5) / 100);
  }, [getTotalPrice]);

  const getSum = useCallback(() => {
    return Math.round(getTotalPrice() + getVatCost());
  }, [getTotalPrice, getVatCost]);

  return {
    getTotalPrice,
    getVatCost,
    getSum,
  };
};

export default useCheckout;
