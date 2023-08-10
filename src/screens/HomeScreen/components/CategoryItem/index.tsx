/* eslint-disable react/react-in-jsx-scope */
import {FC} from 'react';
import {CategoryItemProps} from './CategoryItem.type';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../../constants/colors';

const CategoryItem: FC<CategoryItemProps> = ({category}) => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.wrapper}>
      <Image style={styles.img} source={{uri: category.imageUrl}} />
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  wrapper: {
    width: 200,
    height: 200,
    position: 'relative',
    justifyContent: 'flex-end',
    borderRadius: 15,
    overflow: 'hidden',
  },
  img: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  nameWrapper: {
    backgroundColor: '#000000',
    opacity: 0.43,
  },
  name: {
    textAlign: 'center',
    color: colors.white,
    fontWeight: '600',
    paddingVertical: 5,
  },
});
