// import {View, StyleSheet, Image, Dimensions} from 'react-native';
// import React, {memo, useEffect, useState} from 'react';
// import SectionTitle from '../SectionTitle';
// import {useReduxDispatch, useReduxSelector} from '../../../../redux/store';
// import {getNewArrivals} from '../../../../redux/slices/static/staticSlice';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
// import {colors} from '../../../../constants/colors';
// import convertHttp from '../../../../utils/convertHttp';
// import {API_PROCESS} from '../../../../redux/enum';
// import NavigationService from '../../../../config/stack/navigationService';

// const NewArrivals = () => {
//   const dispatch = useReduxDispatch();
//   const {newArrivals, getNewArrivalsStatus} = useReduxSelector(
//     state => state.static,
//   );
//   const [activeDot, setActiveDot] = useState(0);
//   useEffect(() => {
//     if (
//       newArrivals.length <= 0 &&
//       getNewArrivalsStatus !== API_PROCESS.SUCCESS
//     ) {
//       dispatch(getNewArrivals());
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);
//   return (
//     <View style={styles.wrapper}>
//       <View style={styles.ph18}>
//         <SectionTitle

//         />
//         {newArrivals.length > 0 && (
//           <View style={styles.styleWrp}>
//             {/* <Carousel
//               renderItem={({item, index}) => {
//                 return (
//                   <View style={styles.silderWrapper} key={index}>
//                     <Image
//                       style={styles.imageSlider}
//                       source={{uri: convertHttp(item.imageUrls[0])}}
//                     />
//                   </View>
//                 );
//               }}
//               data={newArrivals}
//               itemWidth={Dimensions.get('window').width - 36}
//               sliderWidth={Dimensions.get('window').width - 36}
//               pagingEnabled={true}
//               onSnapToItem={index => setActiveDot(index)}
//             /> */}
//             <View style={styles.pagination}>
//               <Pagination
//                 containerStyle={styles.ctn}
//                 dotStyle={styles.dot}
//                 inactiveDotStyle={styles.inactiveDot}
//                 activeDotIndex={activeDot}
//                 dotsLength={newArrivals.length}
//               />
//             </View>
//           </View>
//         )}
//       </View>
//     </View>
//   );
// };

// export default memo(NewArrivals);

// const styles = StyleSheet.create({
//
// });

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import SectionTitle from '../SectionTitle';
import {useReduxDispatch, useReduxSelector} from '../../../../redux/store';
import {getNewArrivals} from '../../../../redux/slices/static/staticSlice';
import {colors} from '../../../../constants/colors';
import NavigationService from '../../../../config/stack/navigationService';
import convertHttp from '../../../../utils/convertHttp';
import {API_PROCESS} from '../../../../redux/enum';
import LinearGradient from 'react-native-linear-gradient';
import {getProductDetailThunk} from '../../../../redux/slices/category/categorySlice';

const Categories = () => {
  const {categories} = useReduxSelector(state => state.static);
  const [itemSelected, setItemSelected] = useState(0);
  let [scrollRef, setScroll] = useState<ScrollView | null>(null);

  const dispatch = useReduxDispatch();
  const {newArrivals, getNewArrivalsStatus} = useReduxSelector(
    state => state.static,
  );
  useEffect(() => {
    if (
      newArrivals.length <= 0 &&
      getNewArrivalsStatus !== API_PROCESS.SUCCESS
    ) {
      dispatch(getNewArrivals());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJum = useCallback(
    (isIncrement?: boolean) => {
      if (isIncrement && scrollRef && itemSelected + 1 < categories.length) {
        scrollRef.scrollTo({x: 218 * (itemSelected + 1), animated: true});
        setItemSelected(current => current + 1);
      } else if (!isIncrement && itemSelected > 0 && scrollRef) {
        scrollRef.scrollTo({x: 218 * (itemSelected - 1), animated: true});
        setItemSelected(current => current - 1);
      }
    },
    [scrollRef, itemSelected, categories],
  );
  //   scrollRef?.addListenerOn();
  return (
    <View style={styles.wrapper}>
      <View style={styles.ph18}>
        <SectionTitle
          name="New Arrivals"
          viewAllPressHandle={() => {
            NavigationService.push('NewArrivals');
          }}
        />
      </View>

      <ScrollView
        ref={ref => {
          setScroll(ref);
        }}
        onScroll={event => {
          console.log(newArrivals.length);

          const index = event.nativeEvent.contentOffset.x / 100;
          if (index >= 0 && index < newArrivals.length) {
            setItemSelected(Math.floor(index));
          }
        }}
        showsHorizontalScrollIndicator={false}
        horizontal>
        <View style={styles.slide}>
          {newArrivals.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {
                  dispatch(getProductDetailThunk({productId: item.id}));
                  NavigationService.push('ProductDetail', {
                    productId: item.id,
                  });
                }}>
                <View style={styles.silderWrapper}>
                  <Image
                    style={styles.imageSlider}
                    source={{uri: convertHttp(item.imageUrls[0])}}
                  />
                  <View
                    style={{
                      zIndex: 10000,
                      bottom: -13,
                      borderRadius: 9,
                      width: '100%',
                      overflow: 'hidden',
                    }}>
                    <LinearGradient
                      start={{x: 1, y: 1}}
                      end={{x: 1, y: 0}}
                      colors={[colors.description, '#fff']}>
                      <View
                        style={{
                          height: 30,
                          width: '100%',
                          zIndex: 1000,
                        }}></View>
                    </LinearGradient>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.controlWrapper}>
        <View style={styles.dotWrapper}>
          {newArrivals.map((category, index) => {
            return (
              <View
                key={category.id}
                style={[
                  styles.dotCtn,
                  index === itemSelected ? styles.dotSelected : undefined,
                ]}></View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default memo(Categories);

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: 50,
  },
  ph18: {paddingHorizontal: 18},
  slide: {
    flexDirection: 'row',
    gap: 18,
    paddingHorizontal: 18,
  },
  controlWrapper: {
    position: 'absolute',
    bottom: 12,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    gap: 15,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: colors.green,
    borderRadius: 10,
  },
  dotSelected: {
    borderRadius: 12,
    borderColor: colors.white,
    backgroundColor: colors.green,
  },
  dotCtn: {
    width: 10,
    height: 10,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.description,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotWrapper: {
    flexDirection: 'row',
    gap: 15,
  },
  // wrapper: {
  //     paddingBottom: 30,
  //   },
  //   ph18: {
  //     paddingHorizontal: 18,
  //   },
  silderWrapper: {
    width: 140,
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    borderRadius: 9,
    borderWidth: 0.5,
    aspectRatio: 10 / 11,
    overflow: 'hidden',
  },
  imageSlider: {
    width: '70%',
    borderRadius: 16,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  //   styleWrp: {
  //     position: 'relative',
  //     borderWidth: 0.5,
  //     borderRadius: 9,
  //   },
  //   pagination: {
  //     position: 'absolute',
  //     width: '100%',
  //     bottom: 0,
  //   },
  //   ctn: {paddingBottom: 8},
  //   dot: {
  //     width: 10,
  //     height: 10,
  //     borderRadius: 10,
  //     backgroundColor: colors.green,
  //   },
  //   inactiveDot: {
  //     width: 16,
  //     height: 16,
  //     borderRadius: 16,
  //   },
});
