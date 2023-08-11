import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import TextField from '../../TextField';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../constants/colors';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {useReduxDispatch, useReduxSelector} from '../../../redux/store';
import {LoginFormField} from './LoginForm.type';
import {API_PROCESS} from '../../../redux/enum';
import {login} from '../../../redux/slices/user/userSlice';

const schema = yup.object({
  email: yup.string().email('Email invalid.').required('Email is required.'),
  password: yup.string().required('Password is required.'),
});
const LoginForm = () => {
  const dispatch = useReduxDispatch();
  const {loginStatus} = useReduxSelector(state => state.user);
  const {handleSubmit, control} = useForm<LoginFormField>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: LoginFormField) => {
    dispatch(login(data));
    console.log(data);
  };
  return (
    <View style={styles.wrapper}>
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
              isHidden
              error={error?.message}
              onTextChange={onChange}
            />
          );
        }}
      />
      <View style={styles.ctn}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loginStatus === API_PROCESS.LOADING}>
          <View style={styles.btnWrp}>
            {loginStatus === API_PROCESS.LOADING ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={styles.btnText}>Sign In</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

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
  signUpWrp: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
    marginBottom: 20,
    alignItems: 'center',
    gap: 8,
  },
  question: {
    fontSize: 14,
    color: '#000',
    opacity: 0.3,
  },
  signUp: {
    fontSize: 16,
    color: colors.greenBlue,
    fontWeight: '700',
  },
});
