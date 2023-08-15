import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from '../../components/Header';
import NavIcon from '../../assets/svgs/nav.svg';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {
  chooseCategory,
  getAll,
  loadMore,
} from '../../redux/slices/category/categorySlice';
import ListProducts from './components/ListProduct';
import CategoryHeader from './components/CategoryHeader';
import {API_PROCESS} from '../../redux/enum';
import FilterIcon from '../../assets/svgs/fillter.svg';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import {colors} from '../../constants/colors';
import {ScrollView} from 'react-native-gesture-handler';

const ExploreScreen = ({route}) => {
  const [filter, setFilter] = useState<any>(undefined);
  const {categories} = useReduxSelector(state => state.static);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {
    categorySelected,
    isGetAll,
    totalRecord,
    products,
    getListProductsStatus,
  } = useReduxSelector(state => state.category);
  const dispatch = useReduxDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (route?.params?.category) {
      dispatch(
        chooseCategory({
          categoryId: route?.params?.category.id,
        }),
      );
    } else if (categories.length > 0) {
      dispatch(getAll());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, route]);
  useEffect(() => {
    if (filter) {
      if (categorySelected) {
        dispatch(
          chooseCategory({
            categoryId: categorySelected.id,
            filter: filter,
          }),
        );
      } else {
        dispatch(getAll({filter}));
      }
      bottomSheetModalRef.current?.close();
      setFilter(undefined);
    }
  }, [filter]);
  const renderNavIcon = useCallback(() => {
    return (
      <View style={{position: 'relative'}}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <NavIcon />
        </TouchableWithoutFeedback>
        {modalVisible && (
          <View style={styles.modalContainer}>
            <View style={styles.modalWrp}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  if (!isGetAll) {
                    dispatch(getAll({}));
                  }
                }}>
                <View style={styles.modalItem}>
                  <Text style={styles.modalName}>ALL PRODUCTS</Text>
                </View>
              </TouchableOpacity>
              {categories.map(category => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      if (categorySelected?.id !== category.id) {
                        dispatch(chooseCategory({categoryId: category.id}));
                      }
                    }}
                    key={category.id}>
                    <View style={styles.modalItem}>
                      <Text style={styles.modalName}>
                        {category.name.trim()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalVisible]);
  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 100;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={2}
      />
    ),
    [],
  );

  const renderFilter = useCallback(() => {
    const filter = [
      {
        text: 'Less than 1,000 AED',
        filter: {
          priceFrom: '0',
          priceTo: '1000',
        },
      },
      {
        text: '1,000-5,000 AED',
        filter: {
          priceFrom: '1000',
          priceTo: '5000',
        },
      },
      {
        text: 'More than 5,000 AED',
        filter: {
          priceFrom: '5000',
        },
      },
      {
        text: 'Low to high price',
        filter: {
          isLowToHigh: true,
        },
      },
      {
        text: 'Low to high price',
        filter: {
          isHightToLow: true,
        },
      },
      {
        text: 'Promotion',
        filter: {
          isPromotion: true,
        },
      },
      {
        text: 'New Arrivals',
        filter: {
          isNewArrival: true,
        },
      },
    ];
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        bottomInset={20}
        index={1}
        snapPoints={['25%', '70%']}
        style={{
          marginHorizontal: 18,
        }}
        backdropComponent={renderBackdrop}
        handleStyle={
          {
            // backgroundColor: colors.green,
          }
        }>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.title}>Alahas Diamante</Text>
            <Text style={styles.titleFilter}>Filter</Text>
          </View>
          {filter.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setFilter(item.filter);
                }}
                key={index}>
                <View style={styles.filterItemWrapper}>
                  <Text style={styles.fitterText}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </BottomSheetModal>
    );
  }, [bottomSheetModalRef]);
  return (
    <SafeAreaView style={{paddingBottom: 68}}>
      <Header
        title={isGetAll ? 'ALL PRODUCTS' : categorySelected?.name ?? ''}
        isCanBack={false}
        startIcon={renderNavIcon()}
        subFeature={
          <TouchableOpacity
            onPress={() => {
              bottomSheetModalRef.current?.present();
            }}>
            <FilterIcon />
          </TouchableOpacity>
        }
      />
      <ScrollView
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            if (
              products.length < totalRecord &&
              getListProductsStatus !== API_PROCESS.LOADING
            ) {
              dispatch(loadMore());
            }
          }
        }}>
        <CategoryHeader category={categorySelected} />
        <ListProducts />
      </ScrollView>
      {renderFilter()}
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0 , 0.6)',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: '100%',
    left: -18,
    flex: 1,
    marginTop: 10,
    zIndex: 10000,
  },
  modalWrp: {
    width: '80%',
    backgroundColor: 'white',
    height: '70%',
    marginLeft: 18,
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.7)',
    paddingVertical: 12,
  },
  modalName: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.7)',
  },

  filterItemWrapper: {
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderColor: colors.description,
  },
  fitterText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.greenBlue,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.description,
  },
  titleFilter: {
    textAlign: 'center',
    marginBottom: 12,
    color: colors.description,
  },
});
