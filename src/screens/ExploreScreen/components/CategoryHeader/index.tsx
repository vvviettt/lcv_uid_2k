import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {CategoryHeaderProps} from './CategoryHeader.type';
import {colors} from '../../../../constants/colors';
import convertHttp from '../../../../utils/convertHttp';

const CategoryHeader: FC<CategoryHeaderProps> = ({category}) => {
  if (!category) {
    return <></>;
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.imgWrapper}>
        <Image
          style={styles.image}
          source={{uri: convertHttp(category.imageUrl)}}
        />
      </View>
      <Text style={styles.name}>{category.name}</Text>
    </View>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 0.5,
    marginHorizontal: 18,
    borderColor: colors.description,
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 18,
  },
  imgWrapper: {
    width: '100%',
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '35%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500',
    color: '#000',
  },
});
