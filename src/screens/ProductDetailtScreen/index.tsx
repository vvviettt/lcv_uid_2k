import {ScrollView, SafeAreaView, ActivityIndicator} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import ImageSlider from '../../components/ImageSlider';
import {useReduxSelector} from '../../redux/store';
import {colors} from '../../constants/colors';
import ProductDetailContent from './components/ProductDetailContent';
import Media from '../../components/Media';
import {View} from 'react-native';
import {API_PROCESS} from '../../redux/enum';

const ProductDetail = () => {
  const {productSelected, getListProductsStatus} = useReduxSelector(
    state => state.category,
  );
  console.log(productSelected?.discount);

  return (
    <SafeAreaView style={{paddingBottom: 68}}>
      <Header />
      <ScrollView>
        {getListProductsStatus === API_PROCESS.LOADING && (
          <View style={{width: '100%', paddingTop: 300}}>
            <ActivityIndicator size="large" color={colors.greenBlue} />
          </View>
        )}
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
