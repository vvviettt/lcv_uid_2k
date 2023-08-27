import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {FC} from 'react';
import BackIcon from '../../assets/svgs/back.svg';
import {colors} from '../../constants/colors';
import NavigationService from '../../config/stack/navigationService';

interface TextHeaderProps {
  title: string;
}

const TextHeader: FC<TextHeaderProps> = ({title}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.btnWrapper}>
        <TouchableWithoutFeedback
          onPress={() => {
            NavigationService.pop();
          }}>
          <BackIcon />
        </TouchableWithoutFeedback>
      </View>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default TextHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    paddingVertical: 10,
  },
  btnWrapper: {},
  titleText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: colors.green,
    fontWeight: '500',
  },
});
