/* eslint-disable react-hooks/exhaustive-deps */
import {View, StyleSheet, ScrollView} from 'react-native';
import React, {memo, useEffect} from 'react';
import SectionTitle from '../SectionTitle';
import {useReduxDispatch, useReduxSelector} from '../../../../redux/store';
import {getBestSeller} from '../../../../redux/slices/static/staticSlice';
import BestSellerItem from '../BestSellerItem';
import {API_PROCESS} from '../../../../redux/enum';
import NavigationService from '../../../../config/stack/navigationService';

const BestSeller = () => {
  const dispatch = useReduxDispatch();
  const {bestSeller, getBestSellerStatus} = useReduxSelector(
    state => state.static,
  );
  useEffect(() => {
    if (bestSeller.length <= 0 && getBestSellerStatus !== API_PROCESS.SUCCESS) {
      dispatch(getBestSeller());
    }
  }, []);
  return (
    <View>
      <View style={styles.ph18}>
        <SectionTitle
          name="Best Sellers"
          viewAllPressHandle={() => {
            NavigationService.push('BestSeller');
          }}
        />
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

export default memo(BestSeller);

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
