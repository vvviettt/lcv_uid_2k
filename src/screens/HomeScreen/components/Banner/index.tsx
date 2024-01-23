import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import bannerImg from '../../../../assets/images/banner-1.jpg';
import BannerText from '../../../../assets/svgs/bannerText.svg';
import ChevronsRight from '../../../../assets/svgs/chevrons-right.svg';
import {fonts} from '../../../../constants/fonts';
import {colors} from '../../../../constants/colors';
import NavigationService from '../../../../config/stack/navigationService';
import TabNavigation from '../../../../config/stack/tabNavigationService';

const Banner = () => {
  return (
    <View style={styles.wrapper}>
      <Image style={styles.img} source={bannerImg} />
      <View style={styles.content}>
        <BannerText />
        <TouchableOpacity
          onPress={() => {
            TabNavigation.push('Explore', {});
          }}
          style={styles.btnWrapper}>
          <Text style={styles.btnText}>Shop all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.arrow}>
        <ChevronsRight />
      </View>
    </View>
  );
};

export default Banner;
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginHorizontal: 18,
    height: 160,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    borderRadius: 16,
  },

  content: {
    paddingRight: 40,
    alignItems: 'flex-end',
  },
  btnWrapper: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: 10,
    width: 74,
  },
  btnText: {
    fontFamily: fonts.Poppins.Regular,
    fontSize: 12,
    color: colors.white,
  },
  arrow: {
    position: 'absolute',
    right: 8,
  },
});
