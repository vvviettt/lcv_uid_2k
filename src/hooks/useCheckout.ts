import {useCallback} from 'react';
import {useReduxSelector} from '../redux/store';

const useCheckout = () => {
  const {products} = useReduxSelector(state => state.cart);

  const getTotalPrice = useCallback(() => {
    return products.reduce((currentValue, product) => {
      const priceAfterDiscount = Math.round(
        Number(product.price) *
          (product.discount ? (100 - Number(product.discount)) / 100 : 1),
      );
      return currentValue + priceAfterDiscount * (product.count ?? 1);
    }, 0);
  }, [products]);
  return {
    getTotalPrice,
  };
};

export default useCheckout;
