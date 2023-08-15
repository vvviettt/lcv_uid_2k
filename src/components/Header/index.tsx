import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React, {FC} from 'react';
import BackIcon from '../../assets/svgs/back.svg';
import LogoIcon from '../../assets/svgs/logo.svg';
import SearchIcon from '../../assets/svgs/search.svg';
import CartIcon from '../../assets/svgs/cart_selection.svg';
import {HeaderProps} from './Header.type';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';
import TabNavigation from '../../config/stack/tabNavigationService';
import NavigationService from '../../config/stack/navigationService';
import {useReduxSelector} from '../../redux/store';

const Header: FC<HeaderProps> = ({
  isCanBack = true,
  startIcon,
  title,
  subFeature,
}) => {
  const handleBack = () => {
    if (NavigationService.canGoBack()) {
      NavigationService.goBack();
    }
  };
  const {products} = useReduxSelector(state => state.cart);
  return (
    <View style={styles.wrapper}>
      <View style={styles.leftContainer}>
        {isCanBack && (
          <TouchableOpacity
            onPress={handleBack}
            style={[styles.iconWrap, styles.backIcon]}>
            <BackIcon />
          </TouchableOpacity>
        )}
        <View style={[styles.iconWrap]}>{startIcon && startIcon}</View>
        {title || title === '' ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <LogoIcon />
        )}
      </View>
      <View style={styles.rightContainer}>
        {subFeature ? (
          <View style={[styles.iconWrap, styles.searchIcon]}>{subFeature}</View>
        ) : (
          <>
            <View style={[styles.iconWrap, styles.searchIcon]}>
              <SearchIcon />
            </View>
            <TouchableOpacity
              onPress={() => {
                TabNavigation.push('Cart', {
                  screen: 'CartTab',
                });
              }}
              style={[styles.iconWrap, styles.cartIcon]}>
              <CartIcon />
              <View style={styles.cartCount}>
                <Text style={styles.cartCountText}>{products.length}</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    paddingBottom: 10,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iconWrap: {
    paddingBottom: 10,
  },
  backIcon: {
    paddingRight: 6,
  },
  searchIcon: {
    paddingRight: 6,
  },
  cartIcon: {
    position: 'relative',
    paddingHorizontal: 8,
  },
  cartCount: {
    position: 'absolute',
    backgroundColor: colors.cartCount,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    top: -8,
    left: '80%',
  },
  cartCountText: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fonts.Inter.Regular,
  },
  title: {
    height: 46,
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
    color: colors.green,
    marginTop: 10,
    textTransform: 'uppercase',
  },
});
