import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {
  getOrderHistory,
  loadMoreOrderHistory,
} from '../../redux/slices/cart/cartSlice';
import OrderItem from './components/OrderItem';
import {API_PROCESS} from '../../redux/enum';
import {colors} from '../../constants/colors';

const OrderHistory = () => {
  const dispatch = useReduxDispatch();
  const {
    orders,
    historyOrderStatus,
    loadMoreHistoryOrderStatus,
    totalOrderPage,
    orderPage,
  } = useReduxSelector(state => state.cart);
  useLayoutEffect(() => {
    dispatch(getOrderHistory());
  }, []);
  const loadMore = () => {
    console.log(orderPage, totalOrderPage);

    if (
      loadMoreHistoryOrderStatus !== API_PROCESS.LOADING &&
      orderPage < totalOrderPage
    ) {
      dispatch(loadMoreOrderHistory());
    }
  };
  return (
    <View style={styles.wrapper}>
      {historyOrderStatus === API_PROCESS.LOADING ? (
        <View style={{paddingTop: 200}}>
          <ActivityIndicator size={'large'} color={colors.green} />
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={order => {
            return <OrderItem order={order.item} />;
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            loadMore();
          }}
          ListFooterComponent={
            loadMoreHistoryOrderStatus === API_PROCESS.LOADING ? (
              <Text style={styles.loading}>Loading more...</Text>
            ) : (
              <></>
            )
          }
        />
      )}
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 18,
  },
  loading: {
    paddingVertical: 10,
    fontSize: 18,
    color: colors.green,
    textAlign: 'center',
  },
});
