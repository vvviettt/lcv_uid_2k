import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {FC, useState} from 'react';
import TextField from '../../TextField';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../constants/colors';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {forgotPassword} from '../../../services/user';

const schema = yup.object({
  email: yup.string().email('Email invalid.').required('Email is required.'),
});

interface ForgotPasswordFormProps {
  handleSuccess?: () => void;
}
const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({handleSuccess}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {handleSubmit, control, reset} = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    if (data?.email) {
      setIsLoading(true);
      forgotPassword({email: data?.email})
        .then(() => {
          reset();
          handleSuccess?.();
          ToastAndroid.show(
            'The new password has been sent to your email.',
            ToastAndroid.SHORT,
          );
        })
        .catch(e => {
          ToastAndroid.show(
            'Reset password fail! Try after few minute ',
            ToastAndroid.SHORT,
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }
    ToastAndroid.show('Data is invalid', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.wrapper}>
      <Controller
        name={'email'}
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          return (
            <TextField
              value={value}
              placeholder="Email"
              error={error?.message}
              onTextChange={onChange}
            />
          );
        }}
      />
      <View style={styles.ctn}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isLoading}>
          <View style={styles.btnWrp}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={styles.btnText}>Reset Password</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordForm;

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
