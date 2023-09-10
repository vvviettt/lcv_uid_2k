import React, {FC, useState} from 'react';
import {Alert, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {IProduct} from '../../redux/slices/category/category.type';
import LoveIcon from '../../assets/svgs/wishlist_selection.svg';
import LovedIcon from '../../assets/svgs/loved.svg';
import CartIcon from '../../assets/svgs/cart_white.svg';
import {colors} from '../../constants/colors';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import convertHttp from '../../utils/convertHttp';
import {convertPrice} from '../../utils/convertPrice';
import getDiscount from '../../utils/getDiscount';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import NavigationService from '../../config/stack/navigationService';
import {useReduxDispatch} from '../../redux/store';
import {selectProduct} from '../../redux/slices/category/categorySlice';
import {addToCart} from '../../redux/slices/cart/cartSlice';
import TabNavigation from '../../config/stack/tabNavigationService';

interface FullWidthProductItemProps {
  product: IProduct;
  handleLove: (productId: string) => void;
}

const FullWidthProductItem: FC<FullWidthProductItemProps> = ({
  product,
  handleLove,
}) => {
  const [dotActive, setActiveDot] = useState(0);
  const dispatch = useReduxDispatch();
  const handleAddToCart = () => {
    console.log('okok');

    dispatch(
      addToCart({
        product: product,
        color:
          product.colors && product.colors.length > 0
            ? product.colors[0].name
            : undefined,
        size:
          product.sizes && product.sizes.length > 0
            ? product.sizes[0].value
            : undefined,
      }),
    );
    Alert.alert('Added to cart', 'This product added to your cart.', [
      {
        text: 'Go to checkout',
        style: 'cancel',
        onPress: () => {
          TabNavigation.push('Cart', {});
        },
      },
      {
        text: 'Ok',
        style: 'cancel',
      },
    ]);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dispatch(selectProduct({product: product}));
        NavigationService.push('ProductDetail', {
          productId: '',
        });
      }}>
      <View style={styles.wrapper}>
        <View style={styles.sliceWrapper}>
          <Carousel
            renderItem={({item, index}) => {
              return (
                <View style={styles.imgWrapper} key={index}>
                  <Image style={styles.img} source={{uri: convertHttp(item)}} />
                </View>
              );
            }}
            data={product.imageUrls}
            itemWidth={Dimensions.get('window').width - 36}
            sliderWidth={Dimensions.get('window').width - 36}
            pagingEnabled={true}
            onSnapToItem={index => setActiveDot(index)}
          />
          <View style={styles.pagination}>
            <Pagination
              containerStyle={styles.ctn}
              dotStyle={styles.dot}
              inactiveDotStyle={styles.inactiveDot}
              activeDotIndex={dotActive}
              dotsLength={product.imageUrls.length}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.topContent}>
            <View style={styles.nameWrapper}>
              <Text numberOfLines={2} style={styles.name}>
                {product.name}
              </Text>
            </View>
            <View style={styles.loveBtn}>
              <TouchableWithoutFeedback
                style={{paddingHorizontal: 10}}
                onPress={() => {
                  handleLove(product.id);
                }}>
                {product.isLiked ? <LovedIcon /> : <LoveIcon />}
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.botContent}>
            <View style={styles.priceWrapper}>
              <Text style={[styles.price, styles.oldPrice]}>
                {convertPrice(product.price.toString())}AED
              </Text>
              <Text style={styles.price}>
                {getDiscount(Number(product.price), product.discount)}AED
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={() => {
                handleAddToCart();
              }}>
              <View style={styles.addToCartWrapper}>
                <CartIcon />
                <Text style={styles.addToCartText}>Add to cart</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FullWidthProductItem;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 18,
    elevation: 10,
    marginVertical: 9,
  },
  nameWrapper: {
    flexShrink: 1,
  },
  sliceWrapper: {
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: colors.description,
    position: 'relative',
    borderRadius: 14,
  },
  loveBtn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imgWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '40%',
    aspectRatio: 1,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20,
    flexWrap: 'nowrap',
  },
  name: {
    fontSize: 18,
    color: colors.mainTxt,
  },
  botContent: {
    flexDirection: 'row',
    paddingTop: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  price: {
    color: colors.green,
    fontSize: 16,
    fontWeight: '500',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
  },
  addToCartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.green,
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    gap: 4,
  },
  addToCartText: {
    color: colors.white,
  },
  pagination: {
    position: 'absolute',
    bottom: -10,
    width: '100%',
  },
  ctn: {},
  dot: {
    backgroundColor: colors.green,
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  inactiveDot: {
    width: 10,
    height: 10,
  },
});
