import {ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import ImageSlider from '../../components/ImageSlider';
import {useReduxSelector} from '../../redux/store';
import {colors} from '../../constants/colors';
import ProductDetailContent from './components/ProductDetailContent';
import Media from '../../components/Media';
import {View} from 'react-native';

const ProductDetail = () => {
  const {productSelected} = useReduxSelector(state => state.category);
  return (
    <SafeAreaView style={{paddingBottom: 68}}>
      <Header />
      <ScrollView>
        {productSelected && (
          <>
            <ImageSlider
              wrapperStyle={{
                borderBottomColor: colors.description,
                borderBottomWidth: 0.5,
                paddingBottom: 10,
                marginHorizontal: 18,
              }}
              images={productSelected.imageUrls}
            />
            <ProductDetailContent product={productSelected} />
            <View
              style={{
                marginTop: 20,
                paddingTop: 10,
                borderTopColor: colors.description,
                borderTopWidth: 0.5,
                marginHorizontal: 18,
              }}>
              <Media />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;
