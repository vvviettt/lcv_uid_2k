import {ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import ImageSlider from '../../components/ImageSlider';

const ProductDetail = () => {
  return (
    <SafeAreaView style={{paddingBottom: 68}}>
      <Header />
      <ScrollView>
        <ImageSlider images={[]} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
