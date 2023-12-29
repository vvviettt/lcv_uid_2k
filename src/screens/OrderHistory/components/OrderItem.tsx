import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {FC, useState} from 'react';
import {OrderItemProps} from '../OrderHistory.type';
import {getShippingStatus} from '../../../utils/getShippingStatus';
import {convertPrice} from '../../../utils/convertPrice';
import {covertMonth} from '../../../utils/convertMonth';
import {colors} from '../../../constants/colors';
import {useReduxDispatch} from '../../../redux/store';
import {getOrderHistoryDetail} from '../../../redux/slices/cart/cartSlice';
import NavigationService from '../../../config/stack/navigationService';
import SwipeRow from '@nghinv/react-native-swipe-row';
import Dialog from 'react-native-dialog';

const OrderItem: FC<OrderItemProps> = ({order, handleCancel}) => {
  const date = new Date(order.createDate);
  const dispatch = useReduxDispatch();
  const [deleteVisible, setDeleteVisible] = useState(false);
  return (
    <SwipeRow
      disabledOpacity={1}
      disabled={order.status !== 1}
      right={[
        {
          title: 'CANCEL',
          backgroundColor: colors.green,
          onPress: () => {
            setDeleteVisible(true);
          },
        },
      ]}>
      <Dialog.Container visible={deleteVisible}>
        <Dialog.Title>Delete account</Dialog.Title>
        <Dialog.Description>
          Are you sure you want cancel this order?
        </Dialog.Description>
        <Dialog.Button
          onPress={() => {
            setDeleteVisible(false);
          }}
          label="Cancel"
        />
        <Dialog.Button
          onPress={() => {
            setDeleteVisible(false);
            handleCancel(order.id);
          }}
          label="Confirm"
        />
      </Dialog.Container>
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(getOrderHistoryDetail({id: order.id}));
          NavigationService.push('OrderHistoryDetail', {key: order.code});
        }}>
        <View style={styles.wrapper}>
          <View style={styles.content}>
            <Text style={styles.code}>Order : {order.code}</Text>
            <Text style={styles.price}>
              Price :{' '}
              {convertPrice(
                (
                  (Number(order.taxes) ?? 0) + (Number(order.totalPrice) ?? 0)
                ).toString(),
              )}{' '}
              AED
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
    </SwipeRow>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingVertical: 12,
    paddingHorizontal: 12,
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
