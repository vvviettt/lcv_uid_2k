import {
  StyleSheet,
  Switch,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {SettingItemProps} from './SettingItem.type';
import {colors} from '../../../constants/colors';

const SettingItem: FC<SettingItemProps> = ({name, onPress, subElement}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.wrapper}>
        <Text style={styles.name}>{name}</Text>
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
    fontSize: 16,
    fontWeight: '500',
    color: colors.mainTxt,
    textTransform: 'uppercase',
  },
});
