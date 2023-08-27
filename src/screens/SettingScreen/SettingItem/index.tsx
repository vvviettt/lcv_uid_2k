import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {FC} from 'react';
import {SettingItemProps} from './SettingItem.type';
import {colors} from '../../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SettingItem: FC<SettingItemProps> = ({
  name,
  onPress,
  subElement,
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          {icon}
          <Text style={styles.name}>{name}</Text>
        </View>
        {subElement && subElement}
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: colors.description,
    marginHorizontal: 18,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    color: colors.mainTxt,
    textTransform: 'capitalize',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
