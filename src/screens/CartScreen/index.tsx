import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useReduxSelector} from '../../redux/store';
import CartItem from './components/CartItem';
import useCheckout from '../../hooks/useCheckout';
import {convertPrice} from '../../utils/convertPrice';
import {colors} from '../../constants/colors';
import NavigationService from '../../config/stack/navigationService';

const CartScreen = () => {
  const {products} = useReduxSelector(state => state.cart);

  const {getTotalPrice} = useCheckout();
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <ScrollView>
        {products.map(product => {
          return <CartItem key={product.id} product={product} />;
        })}
      </ScrollView>
      <View style={styles.bottomWrapper}>
        <View style={styles.totalWrapper}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalPrice}>
            {convertPrice(getTotalPrice().toString())} AED
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (products.length > 0) {
              NavigationService.push('Checkout');
            } else {
              ToastAndroid.show(
                'Please add product to cart to checkout',
                ToastAndroid.LONG,
              );
            }
          }}>
          <View style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Check Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  bottomWrapper: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 18,
  },
  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.mainTxt,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.greenBlue,
  },
  checkoutBtn: {
    backgroundColor: colors.greenBlue,
    paddingVertical: 8,
    borderRadius: 20,
  },
  checkoutText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
  },
});
