import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {CartItemProps} from './CartItem.type';
import PlusIcon from '../../../../assets/svgs/plus.svg';
import MinusIcon from '../../../../assets/svgs/minus.svg';
import RemoveIcon from '../../../../assets/svgs/remove.svg';
import {colors} from '../../../../constants/colors';
import {convertPrice} from '../../../../utils/convertPrice';
import {useReduxDispatch} from '../../../../redux/store';
import {
  addCount,
  removeCount,
  removeToCart,
} from '../../../../redux/slices/cart/cartSlice';
import convertHttp from '../../../../utils/convertHttp';
import getDiscount from '../../../../utils/getDiscount';

const CartItem: FC<CartItemProps> = ({product}) => {
  const dispatch = useReduxDispatch();

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageWrapper}>
        <Image
          source={{uri: convertHttp(product.product.imageUrls[0])}}
          style={styles.img}
        />
        {product.product.discount && (
          <View style={styles.offWrapper}>
            <Text style={styles.offText}>{product.product.discount}% OFF</Text>
          </View>
        )}
      </View>
      <View style={styles.contentWrapper}>
        {/* <View style={styles.n}> */}
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.name}>
          {product.product.name}
        </Text>
        <View>
          {product.colors && (
            <Text style={styles.price}>Color : {product.colors}</Text>
          )}
          {product.size && (
            <Text style={styles.price}>Size : {product.size}</Text>
          )}
        </View>
        {/* </View> */}
        <View style={styles.bottomContent}>
          <View>
            <Text style={styles.price}>
              {getDiscount(
                Number(product.product.price),
                product.product.discount,
              )}{' '}
              AED
            </Text>
            {product.product.discount && (
              <Text style={[styles.price, styles.oldPrice]}>
                {convertPrice(product.product.price)} AED
              </Text>
            )}
          </View>
          <View style={styles.countCtn}>
            <TouchableOpacity
              onPress={() =>
                dispatch(removeCount({productId: product.product.id}))
              }
              style={styles.btn}>
              <MinusIcon />
            </TouchableOpacity>
            <Text style={styles.count}>{product.quantity || 1}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                dispatch(addCount({productId: product.product.id}))
              }>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.removeBtnWrapper}>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(removeToCart({productId: product.product.id}));
          }}>
          <View style={styles.removeBtn}>
            <RemoveIcon />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.green,
    marginVertical: 9,
    marginHorizontal: 18,
    flexDirection: 'row',
    paddingHorizontal: 9,
    paddingVertical: 9,
    borderRadius: 9,
    gap: 9,
    position: 'relative',
  },
  removeBtnWrapper: {
    position: 'absolute',
    top: -12,
    right: -12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 16,
  },
  removeBtn: {
    width: 25,
    height: 25,
    borderRadius: 25,

    backgroundColor: colors.white,
  },
  img: {
    width: 90,
    height: 90,
  },
  contentWrapper: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.white,
  },
  countCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  btn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 20,
  },
  count: {
    fontSize: 21,
    fontWeight: '600',
    color: colors.white,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },

  imageWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  offWrapper: {
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  offText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.cartCount,
  },
});
