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

const CartItem: FC<CartItemProps> = ({product}) => {
  const dispatch = useReduxDispatch();

  return (
    <View style={styles.wrapper}>
      <Image
        source={{uri: convertHttp(product.imageUrls[0])}}
        style={styles.img}
      />
      <View style={styles.contentWrapper}>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.bottomContent}>
          <Text style={styles.price}>{convertPrice(product.price)} AED</Text>
          <View style={styles.countCtn}>
            <TouchableOpacity
              onPress={() => dispatch(removeCount({productId: product.id}))}
              style={styles.btn}>
              <MinusIcon />
            </TouchableOpacity>
            <Text style={styles.count}>{product.count || 1}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => dispatch(addCount({productId: product.id}))}>
              <PlusIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.removeBtnWrapper}>
        <TouchableNativeFeedback
          onPress={() => {
            dispatch(removeToCart({productId: product.id}));
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
    width: 80,
    height: 80,
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 9,
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
});