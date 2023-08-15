import {StyleSheet, ToastAndroid, View} from 'react-native';
import React, {useEffect} from 'react';
import OrderForm from '../../components/forms/OderForm';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {clearCartForm} from '../../redux/slices/cart/cartSlice';
import {API_PROCESS} from '../../redux/enum';
import NavigationService from '../../config/stack/navigationService';

const CheckOutScreen = () => {
  const dispatch = useReduxDispatch();
  const {orderStatus} = useReduxSelector(state => state.cart);
  useEffect(() => {
    dispatch(clearCartForm());
  }, []);

  useEffect(() => {
    if (orderStatus === API_PROCESS.SUCCESS) {
      dispatch(clearCartForm());
      ToastAndroid.show('Order successfully! Thankyou ', ToastAndroid.LONG);
      NavigationService.goBack();
    }
  }, [orderStatus]);

  return (
    <View>
      <OrderForm />
    </View>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({});
