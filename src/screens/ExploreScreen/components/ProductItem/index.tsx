import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import React, {FC} from 'react';
import {ProductItemProps} from './ProductItem.type';
import HeartIcon from '../../../../assets/svgs/wishlist_selection.svg';
import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants/colors';
import {convertPrice} from '../../../../utils/convertPrice';
import NavigationService from '../../../../config/stack/navigationService';
import {useReduxDispatch} from '../../../../redux/store';
import {selectProduct} from '../../../../redux/slices/category/categorySlice';
import convertHttp from '../../../../utils/convertHttp';

const ProductItem: FC<ProductItemProps> = ({product}) => {
  const dispatch = useReduxDispatch();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(selectProduct({product: product}));
        NavigationService.push('ProductDetail', {productId: product.id});
      }}>
      <View style={styles.wrapper}>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.img}
            source={{
              uri: convertHttp(product.imageUrls[0]),
            }}
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{convertPrice(product.price)} AED</Text>
          <View style={styles.love}>
            <TouchableWithoutFeedback>
              <HeartIcon />
            </TouchableWithoutFeedback>
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
  },
  img: {
    width: '70%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  contentWrapper: {
    paddingTop: 12,
  },
  name: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 22,
    height: 44,
    color: '#000000',
  },
  price: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.green,
    paddingBottom: 14,
    paddingTop: 6,
  },
  love: {alignItems: 'center'},
});
