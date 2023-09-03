import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import CategoryItem from '../HomeScreen/components/CategoryItem';
import {getCategories} from '../../services/static';
import {ICategory} from '../../redux/slices/static/static.type';
import {ActivityIndicator} from 'react-native';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setPage(1);
      const res = await getCategories(1);
      setCategories(res.categories);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const loadMore = () => {};

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <SafeAreaView>
      <Header title="Categories" />
      {!isLoading && categories.length > 0 && (
        <FlatList
          data={categories}
          onEndReached={() => {}}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          renderItem={item => {
            return (
              <CategoryItem
                wrapperStyle={styles.wrapperStyle}
                category={item.item}
                imageStyle={styles.imageStyle}
              />
            );
          }}
        />
      )}
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {marginBottom: 800},
  flatList: {
    marginHorizontal: 18,
    backgroundColor: '#fff',
    height: '90%',
  },
  wrapperStyle: {width: '100%', height: 200, marginBottom: 18},
  imageStyle: {
    width: '40%',
  },
  loading: {
    paddingTop: 150,
  },
});
