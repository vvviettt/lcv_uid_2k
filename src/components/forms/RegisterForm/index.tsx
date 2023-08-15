import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import TextField from '../../TextField';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../constants/colors';

import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {RegisterFormField} from './RegisterForm.type';
import {useReduxDispatch, useReduxSelector} from '../../../redux/store';
import {register} from '../../../redux/slices/user/userSlice';
import {API_PROCESS} from '../../../redux/enum';

const schema = yup.object({
  name: yup.string().required('Name is required.'),
  email: yup.string().email('Email invalid.').required('Email is required.'),
  phone: yup.string().required('Phone is required.'),
  password: yup.string().required('Password is required.'),
});

const RegisterForm = () => {
  const dispatch = useReduxDispatch();
  const {registerStatus} = useReduxSelector(state => state.user);
  const {handleSubmit, control} = useForm<RegisterFormField>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: RegisterFormField) => {
    dispatch(register(data));
  };

  return (
    <View style={styles.wrapper}>
      <Controller
        name={'name'}
        control={control}
        render={({field: {onChange}, fieldState: {error}}) => {
          return (
            <TextField
              placeholder="Name"
              error={error?.message}
              onTextChange={onChange}
            />
          );
        }}
      />
      <Controller
        name={'phone'}
        control={control}
        render={({field: {onChange}, fieldState: {error}}) => {
          return (
            <TextField
              placeholder="Phone"
              error={error?.message}
              onTextChange={onChange}
            />
          );
        }}
      />
      <Controller
        name={'email'}
        control={control}
        render={({field: {onChange}, fieldState: {error}}) => {
          return (
            <TextField
              placeholder="Email"
              error={error?.message}
              onTextChange={onChange}
            />
          );
        }}
      />
      <Controller
        name={'password'}
        control={control}
        render={({field: {onChange}, fieldState: {error}}) => {
          return (
            <TextField
              placeholder="Password"
              error={error?.message}
              isHidden
              onTextChange={onChange}
            />
          );
        }}
      />
      <View style={styles.ctn}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={registerStatus === API_PROCESS.LOADING}>
          <View style={styles.btnWrp}>
            {registerStatus === API_PROCESS.LOADING ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={styles.btnText}>Create</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
  },
  ctn: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnWrp: {
    height: 50,
    width: 140,
    justifyContent: 'center',
    paddingHorizontal: 0,
    borderRadius: 50,
    backgroundColor: colors.greenBlue,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#000',
    opacity: 0.3,
  },
});
