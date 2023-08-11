import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC} from 'react';
import {TextFieldProps} from './TextField.type';
import {colors} from '../../constants/colors';

const TextField: FC<TextFieldProps> = ({
  isHidden,
  placeholder,
  onTextChange,
  error,
}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={isHidden}
          placeholder={placeholder}
          onChangeText={onTextChange}
        />
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  inputContainer: {
    borderRadius: 5,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.13)',
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  errorMessage: {
    fontSize: 14,
    color: colors.cartCount,
  },
});
