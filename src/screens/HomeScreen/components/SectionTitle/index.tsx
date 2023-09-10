import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import DiamondIcon from '../../../../assets/svgs/diamon_ring.svg';
import ViewAllIcon from '../../../../assets/svgs/view_all.svg';
import {SectionTitleProps} from './SectionTitle.type';
import {fonts} from '../../../../constants/fonts';

const SectionTitle: FC<SectionTitleProps> = ({name, viewAllPressHandle}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <DiamondIcon width={30} height={30} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={viewAllPressHandle}>
          <ViewAllIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SectionTitle;

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  right: {},
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    lineHeight: 33,
    color: '#000',
    fontFamily: fonts.Poppins.Medium,
    fontWeight: '600',
    marginLeft: 6,
  },
});
