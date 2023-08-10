/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import SectionTitle from '../SectionTitle';
import {useReduxDispatch, useReduxSelector} from '../../../../redux/store';
import {getBestSeller} from '../../../../redux/slices/static/staticSlice';
import BestSellerItem from '../BestSellerItem';

const BestSeller = () => {
  const dispatch = useReduxDispatch();
  const {bestSeller} = useReduxSelector(state => state.static);
  useEffect(() => {
    if (bestSeller.length <= 0) {
      dispatch(getBestSeller());
    }
  }, []);
  return (
    <View>
      <View style={styles.ph18}>
        <SectionTitle name="Best Sellers" viewAllPressHandle={() => {}} />
      </View>

      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={styles.scrollWrapper}>
          {bestSeller.map(item => {
            return <BestSellerItem object={item} key={item.id} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default BestSeller;

const styles = StyleSheet.create({
  ph18: {
    paddingHorizontal: 18,
  },
  scrollWrapper: {
    flexDirection: 'row',
    gap: 18,
    paddingHorizontal: 18,
  },
});
