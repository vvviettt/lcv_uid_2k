import React, {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Header from '../../components/Header';
import {useState} from 'react';
import {useReduxSelector} from '../../redux/store';
import FullWidthProductItem from '../../components/FullWidthProductItem';

const NewArrivalsScreen = () => {
  const {newArrivals} = useReduxSelector(state => state.static);
  const {user} = useReduxSelector(state => state.user);
  const [newArrival, setNewArrival] = useState(newArrivals);
  const handlerLove = (id: string) => {
    if (!user) {
      ToastAndroid.show(
        'Please sign in before add to wishlist',
        ToastAndroid.CENTER,
      );
      return;
    }
    const newBestSeller = newArrival.map(item => {
      if (item.id === id) {
        return {...item, isLiked: !item.isLiked};
      }
      return item;
    });
    setNewArrival(newBestSeller);
  };

  return (
    <SafeAreaView>
      <Header title="New Arrivals" />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        data={newArrival}
        renderItem={item => {
          return (
            <FullWidthProductItem
              handleLove={handlerLove}
              product={item.item}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default NewArrivalsScreen;

const styles = StyleSheet.create({
  flatList: {
    height: '90%',
    marginVertical: 9,
  },
});
