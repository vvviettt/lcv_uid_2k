import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {ImageSliderProps} from './ImageSlider.type';
import {colors} from '../../constants/colors';
import convertHttp from '../../utils/convertHttp';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing';

const ImageSlider: FC<ImageSliderProps> = ({images, wrapperStyle}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  return (
    <View style={wrapperStyle}>
      <ImageView
        images={images.map(item => ({uri: convertHttp(item)}))}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        backgroundColor={colors.green}
      />
      {images.length > 0 && (
        <View style={styles.styleWrp}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsVisible(true);
            }}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{uri: convertHttp(images[imageIndex])}}
              />
            </View>
          </TouchableWithoutFeedback>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.scroll}>
              {images.map((image, index) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => setImageIndex(index)}
                    key={index}>
                    <View
                      style={[
                        styles.miniImgContainer,
                        index === imageIndex ? styles.active : {},
                      ]}>
                      <Image
                        style={styles.miniImg}
                        source={{uri: convertHttp(image)}}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  styleWrp: {},
  scroll: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginTop: 10,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 18 / 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.description,
    borderRadius: 8,
  },
  image: {
    width: '40%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  miniImgContainer: {
    width: 100,
    height: 100,
    borderWidth: 0.5,
    borderLeftColor: colors.description,
    borderRightColor: colors.description,
    borderTopColor: colors.description,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  miniImg: {
    width: '90%',
    aspectRatio: 1,
  },
  active: {
    borderBottomWidth: 3,
    borderBottomColor: colors.greenBlue,
  },
});
