import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';
import React, {useCallback} from 'react';
import Header from '../../components/Header';
import Banner from './components/Banner';
import Categories from './components/Categories';
import BestSeller from './components/BestSeller';
import NewArrivals from './components/NewArrivals';
import Media from '../../components/Media';
import {useReduxSelector} from '../../redux/store';
import {colors} from '../../constants/colors';
import {API_PROCESS} from '../../redux/enum';

const HomeScreen = () => {
  const {getBestSellerStatus, getCategoriesStatus, getNewArrivalsStatus} =
    useReduxSelector(state => state.static);
  const renderView = useCallback(() => {
    if (
      getBestSellerStatus !== API_PROCESS.LOADING &&
      getNewArrivalsStatus !== API_PROCESS.LOADING &&
      getCategoriesStatus !== API_PROCESS.LOADING
    ) {
      return (
        <>
          <Banner />
          <Categories />
          <BestSeller />
          <NewArrivals />
          <Media />
        </>
      );
    }
    return (
      <View style={{width: '100%', paddingTop: 300}}>
        <ActivityIndicator size="large" color={colors.greenBlue} />
      </View>
    );
  }, [getBestSellerStatus, getCategoriesStatus, getNewArrivalsStatus]);
  return (
    <SafeAreaView style={{paddingBottom: 58}}>
      <Header isCanBack={false} />
      <ScrollView>{renderView()}</ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
