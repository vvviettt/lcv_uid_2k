import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {useReduxSelector} from '../../redux/store';
import CartItem from './components/CartItem';
import useCheckout from '../../hooks/useCheckout';
import {convertPrice} from '../../utils/convertPrice';
import {colors} from '../../constants/colors';
import NavigationService from '../../config/stack/navigationService';
import Collapsible from 'react-native-collapsible';
import ArrowIcon from '../../assets/svgs/arrow-down.svg';
import ArrowUpIcon from '../../assets/svgs/arrow-up.svg';

const CartScreen = () => {
  const {products} = useReduxSelector(state => state.cart);
  const {user} = useReduxSelector(state => state.user);
  const [collapsed, setCollapsed] = useState(true);
  const {getTotalPrice, getVatCost, getSum} = useCheckout();

  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
      }}>
      <ScrollView>
        {products.map(product => {
          return <CartItem key={product.product.id} product={product} />;
        })}
      </ScrollView>
      <View style={styles.bottomWrapper}>
        <TouchableWithoutFeedback onPress={() => setCollapsed(!collapsed)}>
          <View style={styles.btn}>
            {collapsed ? <ArrowUpIcon width={18} /> : <ArrowIcon width={18} />}
          </View>
        </TouchableWithoutFeedback>
        <Collapsible collapsed={collapsed}>
          <Text style={styles.boldText}>Cart total</Text>
          <View style={[styles.totalWrapper, styles.wrapperLine]}>
            <Text style={styles.mediumText}>Sub total</Text>
            <Text style={styles.priceMedium}>
              {convertPrice(getTotalPrice().toString())} AED
            </Text>
          </View>
          <View style={styles.wrapperLine}>
            <View style={styles.totalWrapper}>
              <Text style={styles.mediumText}>Shipping</Text>
              <Text style={styles.freeShip}>Free Shipping</Text>
            </View>
            <Text style={styles.shippingNote}>
              ( * All local order for UAE will be shipped in 4-5 days and 7-10
              days for international orders)
            </Text>
          </View>
          <View style={[styles.totalWrapper, styles.wrapperLine]}>
            <Text style={styles.mediumText}>VAT(5%)</Text>
            <Text style={styles.priceMedium}>
              {convertPrice(getVatCost().toString())} AED
            </Text>
          </View>
        </Collapsible>
        <View style={[styles.totalWrapper, {paddingVertical: 14}]}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalPrice}>
            {convertPrice(getSum().toString())} AED
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!user) {
              ToastAndroid.show('Please login to checkout', ToastAndroid.LONG);
              return;
            }
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
            <Text style={styles.checkoutText}>proceed to Checkout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
  },
  bottomWrapper: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    elevation: 2,
    zIndex: 1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
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
    textTransform: 'uppercase',
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
    textTransform: 'uppercase',
  },
  priceMedium: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.green,
  },
  boldText: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.mainTxt,
    textTransform: 'uppercase',
  },
  mediumText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.mainTxt,
    textTransform: 'uppercase',
  },
  shippingNote: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.red,
    fontStyle: 'italic',
    paddingTop: 8,
  },
  wrapperLine: {
    paddingVertical: 13,
    borderBottomWidth: 0.5,
  },
  freeShip: {
    color: colors.greenBlue,
    fontSize: 15,
    fontWeight: '600',
  },
});
