import {useCallback} from 'react';
import {useReduxSelector} from '../redux/store';

const useCheckout = () => {
  const {products} = useReduxSelector(state => state.cart);
  const getTotalPrice = useCallback(() => {
    return products.reduce((currentValue, product) => {
      return currentValue + Number(product.price) * (product.count ?? 1);
    }, 0);
  }, [products]);
  return {
    getTotalPrice,
  };
};

export default useCheckout;
