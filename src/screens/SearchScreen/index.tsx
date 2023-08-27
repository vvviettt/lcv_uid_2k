import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import {debounce} from 'lodash';
import {ActivityIndicator} from 'react-native';
import {getAllProductCategory, likeOrUnlikeApi} from '../../services/category';
import {IProduct} from '../../redux/slices/category/category.type';
import ProductItem from '../ExploreScreen/components/ProductItem';
import {colors} from '../../constants/colors';

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [searchText, setSearchText] = useState('');

  const handleSearch = useCallback(
    debounce(async () => {
      if (searchText === '') {
        setIsLoading(false);
        setProducts([]);
        return;
      }
      try {
        setIsLoading(true);
        setPage(1);
        const fetch = await getAllProductCategory(1, {name: searchText});
        setProducts(fetch.products);
        setTotalRecord(fetch.totalProducts);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setProducts([]);
      }
    }, 1000),
    [searchText],
  );

  useEffect(() => {
    handleSearch();
  }, [searchText, handleSearch]);

  const handleLoadMore = async () => {
    if (
      !isLoading &&
      !isLoadMore &&
      products.length < totalRecord &&
      searchText !== ''
    ) {
      try {
        setIsLoadMore(true);
        setPage(p => p + 1);
        const fetch = await getAllProductCategory(page + 1, {name: searchText});
        setProducts([...products, ...fetch.products]);
        setIsLoadMore(false);
      } catch (error) {
        setIsLoadMore(false);
        setProducts([]);
      }
    }
  };

  const handleAddWshList = (productId: string) => {
    setProducts(
      products.map(product => {
        if (product.id === productId) {
          return {...product, isLiked: !product.isLiked};
        }
        return product;
      }),
    );
    likeOrUnlikeApi(productId);
  };
  const renderLoadMore = useCallback(() => {
    if (isLoadMore) {
      return (
        <Text style={{textAlign: 'center', fontSize: 16, color: colors.green}}>
          Loading More ...
        </Text>
      );
    }
    return <></>;
  }, [isLoadMore]);

  return (
    <SafeAreaView>
      <Header title="Search" hiddenSearch />
      <View style={styles.wrapper}>
        <TextField
          placeholder="Search..."
          onTextChange={value => {
            setSearchText(value);
          }}
        />
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
        {!isLoading && products.length < 1 && <Text>No result found</Text>}
        {!isLoading && (
          <View style={{flexWrap: 'wrap', rowGap: 18}}>
            <FlatList
              data={products}
              numColumns={2}
              onEndReached={() => {
                handleLoadMore();
              }}
              key={'_'}
              contentContainerStyle={{
                paddingBottom: 370,
                rowGap: 18,
              }}
              style={{
                width: '100%',
              }}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={renderLoadMore()}
              renderItem={({item}) => {
                return (
                  <ProductItem
                    addWishListHandle={() => {
                      handleAddWshList(item.id);
                    }}
                    product={item}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 18,
  },
  loading: {
    paddingTop: 150,
  },
});
