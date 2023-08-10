import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {FC} from 'react';
import {BestSellerItemProps} from './BestSeller.type';
import {colors} from '../../../../constants/colors';
import CartIcon from '../../../../assets/svgs/cart_white.svg';

const BestSellerItem: FC<BestSellerItemProps> = ({object}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.imgSwrapper}>
          <Image style={styles.img} source={{uri: object.imageUrls[0]}}></Image>
        </View>
        <View style={styles.content}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={styles.name}>
            {object.name}
          </Text>
          <Text style={styles.price}>
            {Number(object.price).toLocaleString()} UED
          </Text>
        </View>
        <View style={styles.btnWrp}>
          <TouchableWithoutFeedback>
            <View style={styles.btn}>
              <CartIcon width={16} />
              <Text style={styles.btnText}>Add to cart</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default BestSellerItem;

const styles = StyleSheet.create({
  wrapper: {
    width: 160,
  },
  container: {
    position: 'relative',
    alignItems: 'center',
    // alignContent: ',
  },
  imgSwrapper: {
    position: 'absolute',
    zIndex: 100,
  },
  img: {
    width: 136,
    height: 136,
    zIndex: 100,
    borderRadius: 16,
  },
  content: {
    paddingTop: 85,
    paddingBottom: 10,
    marginTop: 65,
    width: '100%',
    backgroundColor: colors.greenBlue,
    paddingHorizontal: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  name: {
    fontSize: 16,
    color: colors.white,
    lineHeight: 20,
    height: 40,
  },
  price: {
    textAlign: 'right',
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  btnWrp: {
    backgroundColor: colors.greenBlue,
    width: '100%',
    borderBottomStartRadius: 16,
    borderBottomEndRadius: 16,
    borderColor: colors.greenBlue,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: colors.green,
    width: '100%',
    borderRadius: 16,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    bottom: 0,
  },
  btnText: {
    color: colors.white,
  },
});
