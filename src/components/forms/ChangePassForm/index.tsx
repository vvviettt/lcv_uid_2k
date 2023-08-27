import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {FC, useState} from 'react';
import TextField from '../../TextField';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../constants/colors';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {ChangePassFormField} from './ChangePassForm.type';
import {changePasswordAccount} from '../../../services/user';

const schema = yup.object({
  newPassword: yup.string().required('New password is required.'),
  email: yup.string().email('Email invalid.').required('Email is required.'),
  oldPassword: yup.string().required('Old password is required.'),
});

interface ChangePassFormProps {
  onSuccess?: () => void;
}

const ChangePassForm: FC<ChangePassFormProps> = ({onSuccess}) => {
  const [loading, setLoading] = useState(false);
  const {handleSubmit, control} = useForm<ChangePassFormField>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: ChangePassFormField) => {
    try {
      setLoading(true);
      await changePasswordAccount(data);
      setLoading(false);
      onSuccess && onSuccess();
    } catch (error) {
      setLoading(false);
    }
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
        name={'oldPassword'}
        control={control}
        render={({field: {onChange}, fieldState: {error}}) => {
          return (
            <TextField
              placeholder="Old password"
              error={error?.message}
              isHidden
              onTextChange={onChange}
            />
          );
        }}
      />
      <Controller
        name={'newPassword'}
        control={control}
        render={({field: {onChange}, fieldState: {error}}) => {
          return (
            <TextField
              placeholder="New password"
              error={error?.message}
              isHidden
              onTextChange={onChange}
            />
          );
        }}
      />
      <View style={styles.ctn}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={loading}>
          <View style={styles.btnWrp}>
            {loading ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={styles.btnText}>Change</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassForm;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingBottom: 30,
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
