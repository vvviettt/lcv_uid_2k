import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import useAuthBottomSheet from '../../hooks/useAuthBottomSheet';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {
  getWishList,
  getMoreWishList,
} from '../../redux/slices/category/categorySlice';
import ProductItem from '../ExploreScreen/components/ProductItem';
import {API_PROCESS} from '../../redux/enum';
import {colors} from '../../constants/colors';

const WishlistScreen = ({navigation}) => {
  const ref = useRef<BottomSheetModal>(null);
  const {renderLogin, openLoginSheet, renderRegister, closeAll} =
    useAuthBottomSheet(ref);
  const {user} = useReduxSelector(state => state.user);
  const {
    getWishListStatus,
    wishList,
    isWishlistLoadMore,
    wishListTotalRecord,
    wishlistCurrentPage,
  } = useReduxSelector(state => state.category);
  const dispatch = useReduxDispatch();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!user) {
        openLoginSheet();
      } else {
        dispatch(getWishList());
      }
    });
    if (user) {
      closeAll();
    }
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, user]);
  useEffect(() => {
    if (user) {
      dispatch(getWishList());
    }
  }, [user]);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 100;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const render = useCallback(() => {
    if (getWishListStatus !== API_PROCESS.LOADING) {
      if (user) {
        if (wishList.length > 0) {
          return (
            <View style={styles.wrapper}>
              {wishList.map(item => (
                <ProductItem key={item.id} product={item} />
              ))}
              {isWishlistLoadMore === API_PROCESS.LOADING && (
                <Text style={styles.loadMore}>Loading more ...</Text>
              )}
            </View>
          );
        }
        return (
          <View style={styles.container}>
            <Text style={styles.warning}>
              There are no products in wishlist
            </Text>
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <Text style={styles.warning}>
            Please login if you want to view wishlist
          </Text>
        </View>
      );
    }
    return (
      <View style={{width: '100%', paddingTop: 300}}>
        <ActivityIndicator size="large" color={colors.greenBlue} />
      </View>
    );
  }, [wishList, getWishListStatus, user, isWishlistLoadMore]);
  return (
    <View>
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            if (
              wishlistCurrentPage < wishListTotalRecord &&
              isWishlistLoadMore !== API_PROCESS.LOADING
            ) {
              dispatch(getMoreWishList());
            }
          }
        }}>
        {render()}
      </ScrollView>
      {renderRegister()}
      {renderLogin()}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 18,
    marginBottom: 56,
  },
  container: {
    marginTop: 300,
    marginHorizontal: 18,
  },
  warning: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: colors.green,
  },
  loadMore: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.greenBlue,
    textAlign: 'center',
    width: '100%',
    marginVertical: 10,
  },
});
