import {IProduct} from '../redux/slices/category/category.type';
import {addToCart as addToCartAction} from '../redux/slices/cart/cartSlice';
import {useReduxDispatch} from '../redux/store';
import {ToastAndroid} from 'react-native';

const useAddToCart = () => {
  const dispatch = useReduxDispatch();

  const addToCart = (product: IProduct) => {
    dispatch(addToCartAction({product: product}));
    ToastAndroid.showWithGravity(
      'Added to cart',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  return {addToCart};
};

export default useAddToCart;
