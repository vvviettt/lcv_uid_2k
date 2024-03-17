import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {API_PROCESS} from '../../redux/enum';
import {colors} from '../../constants/colors';
import {convertPrice} from '../../utils/convertPrice';
import NavigationService from '../../config/stack/navigationService';
import {getProductDetailThunk} from '../../redux/slices/category/categorySlice';
import getDiscount from '../../utils/getDiscount';
import convertHttp from '../../utils/convertHttp';

const OrderDetail = () => {
  const {historyOrderDetailStatus, orderDetail} = useReduxSelector(
    state => state.cart,
  );
  const dispatch = useReduxDispatch();

  return (
    <View style={styles.wrapper}>
      {historyOrderDetailStatus === API_PROCESS.LOADING ? (
        <View style={{paddingTop: 200}}>
          <ActivityIndicator size={'large'} color={colors.green} />
        </View>
      ) : orderDetail ? (
        <View>
          <Text style={styles.title}>Customer information</Text>
          <View style={styles.infoWrapper}>
            <View>
              <Text style={styles.info}>Name : </Text>
              <Text style={styles.info}>Email :</Text>
              <Text style={styles.info}>Phone : </Text>
              <Text style={styles.info}>Address :</Text>
            </View>
            {orderDetail.others && (
              <View>
                <Text style={styles.info}>{orderDetail.others.name}</Text>
                <Text style={styles.info}>{orderDetail.others.email}</Text>
                <Text style={styles.info}>{orderDetail.others.phone}</Text>
                <Text style={styles.info}>{orderDetail.others.address}</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>Order information</Text>
          {orderDetail.detail.map((item, index) => {
            return (
              <View style={styles.orderItem} key={index}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    dispatch(
                      getProductDetailThunk({
                        productId: item.id,
                      }),
                    );
                    console.log(item.id);

                    NavigationService.push('ProductDetail', {
                      productId: item.id,
                    });
                  }}>
                  <View style={styles.imgWrapper}>
                    <Image
                      style={styles.img}
                      source={{uri: convertHttp(item.imageUrl)}}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.content}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styles.name}>
                    {item.name}
                  </Text>
                  {item.colors && (
                    <Text style={styles.infoItem}>Color : {item.colors}</Text>
                  )}
                  {item.sizes && (
                    <Text style={styles.infoItem}>Size : {item.sizes}</Text>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                    }}>
                    <View>
                      <Text style={[styles.price]}>
                        {getDiscount(Number(item.price), item.discount)} AED
                      </Text>
                      {item.discount && (
                        <Text
                          style={[
                            styles.price,
                            {textDecorationLine: 'line-through'},
                          ]}>
                          {convertPrice(item.price)} AED
                        </Text>
                      )}
                    </View>

                    <Text style={styles.price}>No.{item.quantity}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    flex: 1,
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: colors.green,
    padding: 12,
    gap: 13,
    borderRadius: 12,
    marginBottom: 18,
  },
  imgWrapper: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
  },
  price: {
    fontSize: 15,
    color: colors.white,
  },
  infoItem: {
    color: colors.white,
    fontSize: 15,
  },
  wrapper: {paddingHorizontal: 18},
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.greenBlue,
    paddingBottom: 12,
    paddingTop: 8,
  },
  infoWrapper: {
    flexDirection: 'row',
    gap: 18,
  },
  info: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.mainTxt,
    paddingVertical: 4,
  },
});
