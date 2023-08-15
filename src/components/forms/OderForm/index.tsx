import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TextField from '../../TextField';
import {colors} from '../../../constants/colors';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {OderFormProps} from './OderForm.type';
import {checkout} from '../../../redux/slices/cart/cartSlice';
import {useReduxDispatch, useReduxSelector} from '../../../redux/store';
import {API_PROCESS} from '../../../redux/enum';

const schema = yup.object({
  email: yup.string().email('Email invalid.').required('Email is required.'),
  phone: yup.string().required(),
  name: yup.string().required(),
  address: yup.string().required(),
});

const OrderForm = () => {
  const {handleSubmit, control} = useForm<OderFormProps>({
    resolver: yupResolver(schema),
  });
  const dispatch = useReduxDispatch();
  const onSubmit = (data: OderFormProps) => {
    dispatch(checkout(data));
  };
  const {orderStatus} = useReduxSelector(state => state.cart);
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Text style={styles.field}>Fill your information for order</Text>
        <Controller
          control={control}
          name="name"
          render={({field: {onChange}, fieldState: {error}}) => (
            <TextField
              placeholder="Name"
              onTextChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({field: {onChange}, fieldState: {error}}) => (
            <TextField
              placeholder="Phone"
              onTextChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({field: {onChange}, fieldState: {error}}) => (
            <TextField
              placeholder="Email"
              onTextChange={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({field: {onChange}, fieldState: {error}}) => (
            <TextField
              placeholder="Address"
              onTextChange={onChange}
              error={error?.message}
            />
          )}
        />
        <View style={styles.container}>
          <TouchableOpacity onPress={handleSubmit(onSubmit)}>
            <View style={styles.orderBtnWrapper}>
              {orderStatus === API_PROCESS.LOADING ? (
                <ActivityIndicator size={'small'} color={colors.white} />
              ) : (
                <Text style={styles.orderBtn}>Order</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderForm;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 18,
    marginTop: 10,
  },
  field: {
    fontSize: 16,
    color: colors.mainTxt,
    fontWeight: '500',
    marginBottom: 20,
  },
  container: {alignItems: 'flex-start', marginTop: 10},
  orderBtnWrapper: {
    backgroundColor: colors.greenBlue,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 40,
  },
  orderBtn: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
  },
});
