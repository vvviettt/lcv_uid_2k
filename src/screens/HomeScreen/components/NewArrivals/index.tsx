import {View, StyleSheet, Image, Dimensions} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import SectionTitle from '../SectionTitle';
import {useReduxDispatch, useReduxSelector} from '../../../../redux/store';
import {getNewArrivals} from '../../../../redux/slices/static/staticSlice';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {colors} from '../../../../constants/colors';
import convertHttp from '../../../../utils/convertHttp';
import {API_PROCESS} from '../../../../redux/enum';

const NewArrivals = () => {
  const dispatch = useReduxDispatch();
  const {newArrivals, getNewArrivalsStatus} = useReduxSelector(
    state => state.static,
  );
  const [activeDot, setActiveDot] = useState(0);
  useEffect(() => {
    if (
      newArrivals.length <= 0 &&
      getNewArrivalsStatus !== API_PROCESS.SUCCESS
    ) {
      dispatch(getNewArrivals());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.wrapper}>
      <View style={styles.ph18}>
        <SectionTitle name="New Arrivals" />
        {newArrivals.length > 0 && (
          <View style={styles.styleWrp}>
            <Carousel
              renderItem={({item, index}) => {
                return (
                  <View style={styles.silderWrapper} key={index}>
                    <Image
                      style={styles.imageSlider}
                      source={{uri: convertHttp(item.imageUrls[0])}}
                    />
                  </View>
                );
              }}
              data={newArrivals}
              itemWidth={Dimensions.get('window').width - 36}
              sliderWidth={Dimensions.get('window').width - 36}
              pagingEnabled={true}
              onSnapToItem={index => setActiveDot(index)}
            />
            <View style={styles.pagination}>
              <Pagination
                containerStyle={styles.ctn}
                dotStyle={styles.dot}
                inactiveDotStyle={styles.inactiveDot}
                activeDotIndex={activeDot}
                dotsLength={newArrivals.length}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(NewArrivals);

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 30,
  },
  ph18: {
    paddingHorizontal: 18,
  },
  silderWrapper: {
    width: '100%',
    justifyContent: 'center',
    aspectRatio: 16 / 9,
    alignItems: 'center',
    // elevation: 2,
    borderRadius: 9,
  },
  imageSlider: {
    width: '35%',
    aspectRatio: 1,
    borderRadius: 16,
    resizeMode: 'contain',
  },
  styleWrp: {
    position: 'relative',
    borderWidth: 0.5,
    borderRadius: 9,
  },
  pagination: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  ctn: {paddingBottom: 8},
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.green,
  },
  inactiveDot: {
    width: 16,
    height: 16,
    borderRadius: 16,
  },
});
