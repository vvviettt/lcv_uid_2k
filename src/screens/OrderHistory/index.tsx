import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useLayoutEffect, useMemo} from 'react';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {
  cancelOrderDetail,
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
    cancelOrderStatus,
  } = useReduxSelector(state => state.cart);
  useLayoutEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);
  const loadMore = () => {
    if (
      loadMoreHistoryOrderStatus !== API_PROCESS.LOADING &&
      orderPage < totalOrderPage
    ) {
      dispatch(loadMoreOrderHistory());
    }
  };

  const sortOrder = useMemo(() => {
    return (
      [...orders]?.sort((a, b) => (a.createDate < b.createDate ? 1 : -1)) ?? []
    );
  }, [orders]);

  const handleCancel = (id: string) => {
    if (cancelOrderStatus !== API_PROCESS.LOADING) {
      dispatch(cancelOrderDetail({id: id}));
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
          data={sortOrder}
          renderItem={order => {
            return <OrderItem order={order.item} handleCancel={handleCancel} />;
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
