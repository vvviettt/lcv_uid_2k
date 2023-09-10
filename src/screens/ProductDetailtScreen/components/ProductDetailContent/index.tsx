import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {ProductDetailContentProps} from './ProductDetailContent.type';
import LoveIcon from '../../../../assets/svgs/wishlist_selection.svg';
import LovedIcon from '../../../../assets/svgs/loved.svg';
import CartIcon from '../../../../assets/svgs/cart_white.svg';
import DropdownIcon from '../../../../assets/svgs/dropdown.svg';
import {convertPrice} from '../../../../utils/convertPrice';
import {colors} from '../../../../constants/colors';
import SelectDropdown from 'react-native-select-dropdown';
import useAddToCart from '../../../../hooks/useAddToCart';
import {debounce} from 'lodash';
import {useReduxDispatch, useReduxSelector} from '../../../../redux/store';
import {likeOrUnlike} from '../../../../redux/slices/category/categorySlice';
import getDiscount from '../../../../utils/getDiscount';

const ProductDetailContent: FC<ProductDetailContentProps> = ({product}) => {
  const {addToCart} = useAddToCart();
  const [size, setSize] = useState(undefined);
  const [color, setColor] = useState(undefined);
  const {user} = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch();
  const loveHandle = debounce(() => {
    if (user) {
      dispatch(likeOrUnlike({productId: product.id}));
    } else {
      ToastAndroid.show(
        'Please sign in before add to wishlist',
        ToastAndroid.CENTER,
      );
    }
  }, 500);
  return (
    <View style={styles.wrapper}>
      <View style={styles.nameContainer}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.name}>
          {product.name}
        </Text>

        <View style={styles.futureCtn}>
          <TouchableOpacity onPress={loveHandle} style={styles.futureBtn}>
            {product.isLiked ? <LovedIcon /> : <LoveIcon />}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.checkoutWrapper}>
        <View style={{flexDirection: 'row', gap: 12}}>
          {product.discount && (
            <Text style={[styles.price, {textDecorationLine: 'line-through'}]}>
              {convertPrice(product.price)} AED
            </Text>
          )}
          <Text style={[styles.price]}>
            {getDiscount(Number(product.price), product.discount)} AED
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              addToCart(product, color, size);
            }}
            style={styles.checkOutBtn}>
            <>
              <CartIcon />
              <Text style={styles.checkoutText}>Add to cart</Text>
            </>
          </TouchableOpacity>
        </View>
      </View>

      {product?.sizes?.length && (
        <View style={styles.guideCtn}>
          <Text style={styles.guideText}>Select size</Text>
          <SelectDropdown
            onSelect={item => {
              setSize(item.value);
            }}
            data={product.sizes}
            renderDropdownIcon={() => {
              return <DropdownIcon />;
            }}
            dropdownIconPosition={'right'}
            rowTextStyle={styles.rowTextStyle}
            defaultButtonText="Select size"
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            buttonTextAfterSelection={item => {
              return `${item.value}`;
            }}
            rowTextForSelection={item => {
              return `${item.value}`;
            }}
          />
        </View>
      )}
      {!!product?.colors?.length && (
        <View style={styles.sizeWrapper}>
          <Text style={styles.selectSizeText}>Colors</Text>
          <View style={styles.listSizeWrapper}>
            <SelectDropdown
              defaultButtonText="Select color"
              onSelect={item => {
                setColor(item.name);
              }}
              data={product.colors}
              renderDropdownIcon={() => {
                return <DropdownIcon />;
              }}
              dropdownIconPosition={'right'}
              rowTextStyle={styles.rowTextStyle}
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
              buttonTextAfterSelection={item => {
                return `${item.name}`;
              }}
              rowTextForSelection={item => {
                return `${item.name}`;
              }}
            />
          </View>
        </View>
      )}
      <View>
        <Text style={styles.productDetailText}>Product Details</Text>
        <Text style={styles.productDesText}>{product.details}</Text>
      </View>
    </View>
  );
};

export default ProductDetailContent;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: '500',
    fontSize: 24,
    letterSpacing: -0.3,
    color: '#000',
    maxWidth: '80%',
    paddingRight: 10,
  },
  nameCtn: {
    width: '20%',
  },
  futureCtn: {
    flexDirection: 'row',
  },
  futureBtn: {
    paddingHorizontal: 9,
  },

  checkoutWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.green,
  },
  checkOutBtn: {
    flexDirection: 'row',
    backgroundColor: colors.green,
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 13,
    paddingVertical: 4,
    borderRadius: 6,
  },
  checkoutText: {
    fontSize: 14,
    color: colors.white,
  },
  sizeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
  },
  selectSizeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  listSizeWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
  sizeBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.greenBlue,
  },
  sizeBtnSelected: {
    backgroundColor: colors.greenBlue,
  },
  sizeTextSelected: {
    color: colors.white,
  },
  sizeText: {
    color: colors.greenBlue,
  },
  productDetailText: {
    marginTop: 18,
    color: '#020202',
    fontSize: 18,
    fontWeight: '500',
  },
  productDesText: {
    marginTop: 18,
    fontSize: 14,
    lineHeight: 16,
    color: '#000',
  },
  helpWrapper: {
    paddingTop: 18,
  },
  helpText: {
    fontSize: 16,
    textAlign: 'right',
    color: colors.greenBlue,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderColor: colors.greenBlue,
    borderWidth: 1,
    height: 34,
    borderRadius: 6,
  },
  guideCtn: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  guideText: {
    fontSize: 18,
    color: colors.mainTxt,
    fontWeight: '500',
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: '#020202',
    fontSize: 14,
  },
  rowTextStyle: {
    textAlign: 'left',
  },
});
