import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {FC} from 'react';
import {OrderItemProps} from '../OrderHistory.type';
import {getShippingStatus} from '../../../utils/getShippingStatus';
import {convertPrice} from '../../../utils/convertPrice';
import {covertMonth} from '../../../utils/convertMonth';
import {colors} from '../../../constants/colors';
import {useReduxDispatch} from '../../../redux/store';
import {getOrderHistoryDetail} from '../../../redux/slices/cart/cartSlice';
import NavigationService from '../../../config/stack/navigationService';

const OrderItem: FC<OrderItemProps> = ({order}) => {
  const date = new Date(order.createDate);
  const dispatch = useReduxDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(getOrderHistoryDetail({id: order.id}));
        NavigationService.push('OrderHistoryDetail', {key: order.code});
      }}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <Text style={styles.code}>Order : {order.code}</Text>
          <Text style={styles.price}>
            Price : {convertPrice(order.totalPrice)} AED
          </Text>
          <Text style={styles.date}>
            Date : {covertMonth(date.getMonth() + 1)} {date.getDate()},
            {date.getFullYear()}
          </Text>
        </View>
        <View>
          <Text style={styles.status}>{getShippingStatus(order.status)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingVertical: 12,
    borderBottomColor: colors.description,
  },
  content: {
    gap: 8,
  },
  contentText: {},
  status: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.green,
    textTransform: 'uppercase',
  },
  code: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.green,
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.mainTxt,
  },
  date: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.description,
  },
});
