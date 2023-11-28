/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import {CategoryItemProps} from './CategoryItem.type';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../../constants/colors';
import TabNavigation from '../../../../config/stack/tabNavigationService';
import convertHttp from '../../../../utils/convertHttp';

const CategoryItem: FC<CategoryItemProps> = ({
  category,
  wrapperStyle,
  imageStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        TabNavigation.push('Explore', {
          category: category,
        });
      }}
      activeOpacity={1}
      style={[styles.wrapper, wrapperStyle]}>
      <View style={[styles.imgWrapper, imageStyle]}>
        <Image
          style={styles.img}
          source={{uri: convertHttp(category.imageUrl)}}
        />
      </View>
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  wrapper: {
    width: 150,
    height: 150,
    position: 'relative',
    justifyContent: 'flex-end',
    borderRadius: 15,
    elevation: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderStartColor: 'red',
    alignItems: 'center',
  },
  imgWrapper: {
    width: '70%',
  },
  img: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  nameWrapper: {
    width: '100%',
    backgroundColor: colors.green,
  },
  name: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
    paddingVertical: 5,
  },
});
