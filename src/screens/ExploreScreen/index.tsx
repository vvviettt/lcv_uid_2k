import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
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

const ExploreScreen = ({route}) => {
  const {categories} = useReduxSelector(state => state.static);
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
      dispatch(chooseCategory({categoryId: route?.params?.category.id}));
    } else if (categories.length > 0) {
      dispatch(getAll());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, route]);
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
                    dispatch(getAll());
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
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <SafeAreaView style={{paddingBottom: 68}}>
      <Header
        title={isGetAll ? 'ALL PRODUCTS' : categorySelected?.name ?? ''}
        isCanBack={false}
        startIcon={renderNavIcon()}
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
});
