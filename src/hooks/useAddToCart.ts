import {IProduct} from '../redux/slices/category/category.type';
import {addToCart as addToCartAction} from '../redux/slices/cart/cartSlice';
import {useReduxDispatch} from '../redux/store';
import {Alert, ToastAndroid} from 'react-native';
import TabNavigation from '../config/stack/tabNavigationService';

const useAddToCart = () => {
  const dispatch = useReduxDispatch();

  const addToCart = (product: IProduct, color?: string, size?: string) => {
    if (
      (product.colors && product.colors.length > 0 && !color) ||
      (product.sizes && product.sizes.length > 0 && !size)
    ) {
      ToastAndroid.showWithGravity(
        'Please select size or color',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
      return;
    }
    dispatch(addToCartAction({product: product, color, size}));
    Alert.alert('Added to cart', 'This product added to your cart.', [
      {
        text: 'Go to checkout',
        style: 'cancel',
        onPress: () => {
          TabNavigation.push('Cart', {});
        },
      },
      {
        text: 'Ok',
        style: 'cancel',
      },
    ]);
  };

  return {addToCart};
};

export default useAddToCart;
