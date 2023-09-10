import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TextField from '../../TextField';
import {colors} from '../../../constants/colors';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {OderFormProps} from './OderForm.type';
import {checkout} from '../../../redux/slices/cart/cartSlice';
import {useReduxDispatch, useReduxSelector} from '../../../redux/store';
import {API_PROCESS} from '../../../redux/enum';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const schema = yup.object({
  email: yup.string().email('Email invalid.').required('Email is required.'),
  phone: yup.string().required(),
  name: yup.string().required(),
  address: yup.string().required(),
});

const OrderForm = () => {
  const {orderAutofill} = useReduxSelector(state => state.persist);
  const [saveInfo, setSaveInfo] = useState(true);
  const {handleSubmit, control} = useForm<OderFormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: orderAutofill.email,
      name: orderAutofill.name,
      address: orderAutofill.address,
      phone: orderAutofill.phone,
    },
  });
  const dispatch = useReduxDispatch();
  const onSubmit = (data: OderFormProps) => {
    dispatch(checkout({order: data, isSave: saveInfo}));
  };
  const {orderStatus} = useReduxSelector(state => state.cart);
  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Text style={styles.field}>Fill your information for order</Text>
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              placeholder="Name"
              onTextChange={onChange}
              error={error?.message}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              placeholder="Phone"
              onTextChange={onChange}
              error={error?.message}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              placeholder="Email"
              onTextChange={onChange}
              error={error?.message}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TextField
              placeholder="Address"
              onTextChange={onChange}
              error={error?.message}
              value={value}
            />
          )}
        />
        <BouncyCheckbox
          size={18}
          text="Save your info for next order"
          textStyle={styles.checkbox}
          fillColor={colors.greenBlue}
          isChecked={saveInfo}
          onPress={() => {
            setSaveInfo(!saveInfo);
          }}
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
  checkbox: {
    fontSize: 15,
    color: colors.mainTxt,
    textDecorationLine: 'none',
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
