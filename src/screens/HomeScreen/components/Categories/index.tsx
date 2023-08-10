import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SectionTitle from '../SectionTitle';
import {useReduxDispatch, useReduxSelector} from '../../../../redux/store';
import {getAllCategories} from '../../../../redux/slices/static/staticSlice';
import CategoryItem from '../CategoryItem';
import RightArrowIcon from '../../../../assets/svgs/right_arrow.svg';
import LeftArrowIcon from '../../../../assets/svgs/left_arrow.svg';
import {colors} from '../../../../constants/colors';

const Categories = () => {
  const dispatch = useReduxDispatch();
  const {categories} = useReduxSelector(state => state.static);
  const [itemSelected, setItemSelected] = useState(0);
  let [scrollRef, setScroll] = useState<ScrollView | null>(null);
  useEffect(() => {
    if (categories.length <= 0) {
      dispatch(getAllCategories());
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
        <SectionTitle name="Categories" />
      </View>

      <ScrollView
        ref={ref => {
          setScroll(ref);
        }}
        showsHorizontalScrollIndicator={false}
        horizontal>
        <View style={styles.slide}>
          {categories.map(category => {
            return <CategoryItem category={category} key={category.id} />;
          })}
        </View>
      </ScrollView>
      <View style={styles.controlWrapper}>
        <TouchableWithoutFeedback onPress={() => handleJum()}>
          <LeftArrowIcon />
        </TouchableWithoutFeedback>
        <View style={styles.dotWrapper}>
          {categories.map((category, index) => {
            return (
              <View
                key={category.id}
                style={[
                  styles.dotCtn,
                  index === itemSelected ? styles.dotSelected : undefined,
                ]}>
                <View style={[styles.dot]} />
              </View>
            );
          })}
        </View>
        <TouchableWithoutFeedback onPress={() => handleJum(true)}>
          <RightArrowIcon />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  wrapper: {},
  ph18: {paddingHorizontal: 18},
  slide: {
    flexDirection: 'row',
    gap: 18,
    paddingHorizontal: 18,
  },
  controlWrapper: {
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
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.green,
  },
  dotCtn: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotWrapper: {
    flexDirection: 'row',
    gap: 15,
  },
});
