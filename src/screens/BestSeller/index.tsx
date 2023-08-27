import React, {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {useEffect, useState} from 'react';
import {useReduxSelector} from '../../redux/store';
import FullWidthProductItem from '../../components/FullWidthProductItem';
import {IProduct} from '../../redux/slices/category/category.type';
import {getBessSeller} from '../../services/static';
import {Text} from 'react-native';
import {colors} from '../../constants/colors';

const BestSellerScreen = () => {
  const {user} = useReduxSelector(state => state.user);
  const [bestSellers, setBestSellers] = useState<IProduct[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [page, setPage] = useState(1);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setTotalRecord(0);
      setBestSellers([]);
      setPage(1);
      const res = await getBessSeller(1);
      setTotalRecord(res.totalRecord);
      setBestSellers(res.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setBestSellers([]);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMore = async () => {
    console.log('OKOKOK');

    if (!isLoading && bestSellers.length < totalRecord) {
      try {
        console.log('PAGE', page);
        setLoadMore(true);
        const res = await getBessSeller(page + 1);
        setTotalRecord(res.totalRecord);
        setPage(page + 1);
        setBestSellers([...bestSellers, ...res.products]);
        setLoadMore(false);
      } catch (error) {
        setLoadMore(false);
      }
    }
  };

  const handlerLove = (id: string) => {
    if (!user) {
      ToastAndroid.show(
        'Please sign in before add to wishlist',
        ToastAndroid.CENTER,
      );
      return;
    }
    const newBestSeller = bestSellers.map(item => {
      if (item.id === id) {
        return {...item, isLiked: !item.isLiked};
      }
      return item;
    });
    setBestSellers(newBestSeller);
  };

  return (
    <SafeAreaView>
      <Header title="Best Sellers" />
      {bestSellers && !isLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 110,
          }}
          style={styles.flatList}
          data={bestSellers}
          onEndReached={() => {
            loadMore();
          }}
          ListFooterComponent={() => {
            return isLoadMore ? (
              <View>
                <Text style={styles.loadingText}>Loading more ...</Text>
              </View>
            ) : (
              <></>
            );
          }}
          renderItem={item => {
            return (
              <FullWidthProductItem
                handleLove={handlerLove}
                product={item.item}
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

export default BestSellerScreen;

const styles = StyleSheet.create({
  flatList: {
    marginVertical: 9,
  },
  loading: {
    marginTop: 150,
  },
  loadingText: {
    fontSize: 18,
    color: colors.green,
    textAlign: 'center',
  },
});
