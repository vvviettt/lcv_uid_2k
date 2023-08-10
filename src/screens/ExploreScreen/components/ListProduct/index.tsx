import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {useReduxSelector} from '../../../../redux/store';
import ProductItem from '../ProductItem';
import {API_PROCESS} from '../../../../redux/enum';
import {colors} from '../../../../constants/colors';

const ListProducts = () => {
  const {products, getListProductsStatus} = useReduxSelector(
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
});
