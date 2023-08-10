import {SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Banner from './components/Banner';
import Categories from './components/Categories';
import BestSeller from './components/BestSeller';
import NewArrivals from './components/NewArrivals';
import Media from '../../components/Media';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{paddingBottom: 58}}>
      <Header isCanBack={false} />
      <ScrollView>
        <Banner />
        <Categories />
        <BestSeller />
        <NewArrivals />
        <Media />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
