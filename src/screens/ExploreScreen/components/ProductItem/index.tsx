import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import React, {FC} from 'react';
import {ProductItemProps} from './ProductItem.type';
import HeartIcon from '../../../../assets/svgs/wishlist_selection.svg';
import LovedIcon from '../../../../assets/svgs/loved.svg';
import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants/colors';
import {convertPrice} from '../../../../utils/convertPrice';
import NavigationService from '../../../../config/stack/navigationService';
import {useReduxDispatch, useReduxSelector} from '../../../../redux/store';
import {
  likeOrUnlike,
  selectProduct,
} from '../../../../redux/slices/category/categorySlice';
import convertHttp from '../../../../utils/convertHttp';
import {ToastAndroid} from 'react-native';
import getDiscount from '../../../../utils/getDiscount';

const ProductItem: FC<ProductItemProps> = ({product, addWishListHandle}) => {
  const dispatch = useReduxDispatch();
  const {user} = useReduxSelector(state => state.user);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(selectProduct({product: product}));
        NavigationService.push('ProductDetail', {productId: product.id});
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imgWrapper}>
          {product.imageUrls && (
            <Image
              style={styles.img}
              source={{
                uri: convertHttp(product.imageUrls[0]),
              }}
            />
          )}
          {product.discount && (
            <View style={styles.offWrapper}>
              <Text style={styles.offText}>{product.discount}% OFF</Text>
            </View>
          )}
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.name}>{product.name}</Text>
          <View>
            <Text style={styles.price}>
              {getDiscount(Number(product.price), product.discount)} AED
            </Text>
            {product.discount && (
              <Text style={[styles.price, styles.oldPrice]}>
                {convertPrice(product.price)} AED
              </Text>
            )}

            <View style={styles.love}>
              <TouchableWithoutFeedback
                onPress={() => {
                  if (user) {
                    if (addWishListHandle) {
                      addWishListHandle();
                      return;
                    }
                    dispatch(likeOrUnlike({productId: product.id}));
                  } else {
                    ToastAndroid.show(
                      'Please sign in before add to wishlist',
                      ToastAndroid.CENTER,
                    );
                  }
                }}>
                {product.isLiked ? <LovedIcon /> : <HeartIcon />}
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 9,
    width: '50%',
  },
  imgWrapper: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.description,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 9,
  },
  img: {
    width: '60%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  contentWrapper: {
    paddingTop: 12,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  name: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 22,
    height: 44,
    color: '#000000',
    marginBottom: 10,
  },
  price: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.green,
    fontWeight: '600',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  love: {alignItems: 'center', paddingTop: 14},
  offWrapper: {
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  offText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.cartCount,
  },
});
