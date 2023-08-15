import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import React from 'react';
import {useReduxSelector} from '../../../../redux/store';
import ProductItem from '../ProductItem';
import {API_PROCESS} from '../../../../redux/enum';
import {colors} from '../../../../constants/colors';
import Media from '../../../../components/Media';

const ListProducts = () => {
  const {products, getListProductsStatus, isLoadMore} = useReduxSelector(
    state => state.category,
  );

  return (
    <View style={styles.wrapper}>
      {getListProductsStatus === API_PROCESS.LOADING && (
        <View style={{width: '100%', paddingTop: 300}}>
          <ActivityIndicator size="large" color={colors.greenBlue} />
        </View>
      )}
      {products.map(product => {
        return <ProductItem product={product} key={product.id} />;
      })}
      {isLoadMore === API_PROCESS.LOADING && (
        <Text style={styles.loadMore}>Loading more ...</Text>
      )}
      {getListProductsStatus !== API_PROCESS.LOADING && <Media />}
    </View>
  );
};

export default ListProducts;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 9,
    rowGap: 18,
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
