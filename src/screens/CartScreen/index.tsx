import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  TextInput,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import CartItem from './components/CartItem';
import useCheckout from '../../hooks/useCheckout';
import {convertPrice} from '../../utils/convertPrice';
import {colors} from '../../constants/colors';
// @ts-ignore
import {
  initiateCardPayment,
  configureSDK,
} from '@network-international/react-native-ngenius';
import data from '../../assets/jsons/countries.json';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {OderFormProps} from '../../components/forms/OderForm/OderForm.type';
import CheckBox from '@react-native-community/checkbox';
import {API_PROCESS} from '../../redux/enum';
import SelectDropdown from 'react-native-select-dropdown';
import {Country} from './type';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {confirmOrderAPI, createOrderApi} from '../../services/category';
import {saveOrderInfo} from '../../redux/slices/user/userSlice';
import {clearCartForm} from '../../redux/slices/cart/cartSlice';

const schema = yup.object({
  email: yup.string().email('Email invalid.').required('Email is required.'),
  phone: yup.string().required(),
  name: yup.string().required(),
  city: yup.string().required(),
  area: yup.string().required(),
  addressDetail: yup.string().required(),
  country: yup.string().required(),
});

const CartScreen = () => {
  useEffect(() => {
    configureSDK({
      language: 'en',
      shouldShowOrderAmount: true,
    });
  }, []);

  const dispatch = useReduxDispatch();
  const {products} = useReduxSelector(state => state.cart);
  const {user, orderInfo} = useReduxSelector(state => state.user);
  const [saveInfo, setSaveInfo] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<API_PROCESS>(
    API_PROCESS.INITIAL,
  );
  const [val, setVal] = useState(1);
  const [country, setCountry] = useState<Country>({
    name: 'United Arab Emirates',
    dial_code: '+971',
    code: 'AE',
    emoji: '🇦🇪',
  });
  const {getTotalPrice, getVatCost, getSum} = useCheckout();
  const {control, formState, trigger, getValues} = useForm<OderFormProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: orderInfo?.name,
      country: orderInfo?.country,
      city: orderInfo?.city,
      phone: orderInfo?.phone,
      area: orderInfo?.phone,
      addressDetail: orderInfo?.addressDetail,
      email: orderInfo?.email,
    },
  });

  useLayoutEffect(() => {
    getValues();
    trigger();
  }, []);

  useEffect(() => {
    if (paymentStatus === API_PROCESS.SUCCESS) {
      dispatch(clearCartForm());
      ToastAndroid.show('Order successfully! Thankyou ', ToastAndroid.LONG);
    } else if (paymentStatus === API_PROCESS.FAIL) {
      ToastAndroid.show(
        'Order fail! Try it after few minute',
        ToastAndroid.LONG,
      );
    }
  }, [paymentStatus, dispatch]);
  const display = useMemo(() => {
    return products.length > 0 ? 'flex' : 'none';
  }, [products]);

  return (
    <View
      style={{
        justifyContent: 'space-between',
        flex: 1,
      }}>
      {!(products.length > 0) && (
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: colors.description,
            marginTop: 50,
          }}>
          There are no products in the cart
        </Text>
      )}
      <ScrollView>
        <View>
          {products.map(product => {
            return <CartItem key={product.product.id} product={product} />;
          })}

          <View style={{display: display}}>
            <View style={styles.priceContainer}>
              <Text style={styles.boldText}>Cart total</Text>
              <View
                style={[
                  styles.totalWrapper,
                  styles.wrapperLine,
                  styles.pWrapper,
                ]}>
                <Text style={styles.mediumText}>Sub total</Text>
                <Text style={styles.priceMedium}>
                  {convertPrice(getTotalPrice().toString())} AED
                </Text>
              </View>
              <View style={[styles.wrapperLine, styles.pWrapper]}>
                <View style={styles.totalWrapper}>
                  <Text style={styles.mediumText}>Shipping</Text>
                  <Text style={styles.freeShip}>Free Shipping</Text>
                </View>
                <Text style={styles.shippingNote}>
                  ( * All local order for UAE will be shipped in 6-7 days and
                  1-2 weeks for international orders)
                </Text>
              </View>
              <View
                style={[
                  styles.totalWrapper,
                  styles.wrapperLine,
                  styles.pWrapper,
                ]}>
                <Text style={styles.mediumText}>VAT(5%)</Text>
                <Text style={styles.priceMedium}>
                  {convertPrice(getVatCost().toString())} AED
                </Text>
              </View>
              <View style={[styles.totalWrapper, styles.pWrapper]}>
                <Text style={styles.mediumText}>TOTAL</Text>
                <Text style={styles.priceMedium}>
                  {convertPrice(getSum().toString())} AED
                </Text>
              </View>
            </View>
            <View style={styles.addressWrapper}>
              <Text style={styles.formTitle}>Delivery options</Text>
              <RadioGroup
                containerStyle={{
                  alignItems: 'flex-start',
                }}
                onPress={id => {
                  setVal(parseInt(id));
                }}
                selectedId={`${val}`}
                radioButtons={[
                  {
                    id: '1',
                    label: 'Home Address',
                    value: '1',
                    labelStyle: styles.checkboxTitle,
                    size: 20,
                  },
                  {
                    id: '2',
                    label: 'Work Address',
                    value: '2',
                    labelStyle: styles.checkboxTitle,
                    size: 20,
                  },
                ]}
              />
              <View>
                <View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTitle}>
                      Name <Text style={styles.inputRequired}>*</Text>
                    </Text>
                    <Controller
                      control={control}
                      name="name"
                      render={({field: {onChange, value}}) => {
                        return (
                          <TextInput
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                          />
                        );
                      }}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTitle}>
                      Phone <Text style={styles.inputRequired}>*</Text>
                    </Text>
                    <Controller
                      control={control}
                      name="phone"
                      render={({field: {onChange, value}}) => {
                        return (
                          <View style={styles.phoneWrapper}>
                            <SelectDropdown
                              defaultValue={country}
                              buttonStyle={{
                                width: 64,
                                height: 38,
                                backgroundColor: 'white',
                                borderTopWidth: 0.5,
                                borderBottomWidth: 0.5,
                                borderLeftWidth: 0.5,
                                borderColor: colors.mainTxt,
                              }}
                              dropdownStyle={{
                                width: 300,
                                backgroundColor: 'white',
                              }}
                              onSelect={item => {
                                setCountry(item);
                              }}
                              rowTextForSelection={(item: Country) => {
                                return item.name;
                              }}
                              buttonTextAfterSelection={(item: Country) => {
                                return item.dial_code;
                              }}
                              data={data}
                              renderCustomizedButtonChild={(item: Country) => {
                                return (
                                  <Text
                                    style={{
                                      justifyContent: 'flex-start',
                                      textAlign: 'left',
                                      fontSize: 15,
                                      color: colors.mainTxt,
                                    }}>
                                    {item?.dial_code}
                                  </Text>
                                );
                              }}
                            />
                            <TextInput
                              onChangeText={onChange}
                              value={value}
                              style={styles.input}
                              keyboardType="phone-pad"
                            />
                          </View>
                        );
                      }}
                    />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.inputTitle}>
                      Email <Text style={styles.inputRequired}>*</Text>
                    </Text>
                    <Controller
                      control={control}
                      name="email"
                      render={({field: {onChange, value}}) => {
                        return (
                          <TextInput
                            onChangeText={onChange}
                            value={value}
                            style={styles.input}
                          />
                        );
                      }}
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputTitle}>
                    City <Text style={styles.inputRequired}>*</Text>
                  </Text>
                  <Controller
                    control={control}
                    name="city"
                    render={({field: {onChange, value}}) => {
                      return (
                        <TextInput
                          onChangeText={onChange}
                          value={value}
                          style={styles.input}
                        />
                      );
                    }}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputTitle}>
                    Area <Text style={styles.inputRequired}>*</Text>
                  </Text>
                  <Controller
                    control={control}
                    name="area"
                    render={({field: {onChange, value}}) => {
                      return (
                        <TextInput
                          onChangeText={onChange}
                          value={value}
                          style={styles.input}
                        />
                      );
                    }}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputTitle}>
                    Aparment/Villa/House Number{' '}
                    <Text style={styles.inputRequired}>*</Text>
                  </Text>
                  <Controller
                    control={control}
                    name="addressDetail"
                    render={({field: {onChange, value}}) => {
                      return (
                        <TextInput
                          placeholder="Enter full address, eg. Apt/Villa no, Street Name"
                          onChangeText={onChange}
                          style={styles.input}
                          value={value}
                          placeholderTextColor={colors.description}
                        />
                      );
                    }}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputTitle}>
                    Country <Text style={styles.inputRequired}>*</Text>
                  </Text>
                  <Controller
                    control={control}
                    name="country"
                    render={({field: {onChange, value}}) => {
                      return (
                        <TextInput
                          onChangeText={onChange}
                          value={value}
                          style={styles.input}
                        />
                      );
                    }}
                  />
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setSaveInfo(!saveInfo);
                  }}>
                  <View style={styles.checkboxContainer}>
                    <CheckBox
                      value={saveInfo}
                      onChange={() => {
                        setSaveInfo(!saveInfo);
                      }}
                      boxType="circle"
                      tintColors={{true: '#000', false: '#d4d4d4'}}
                    />
                    <Text style={styles.checkboxTitle}>
                      Billing and shipping information are the same
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomWrapper}>
        {/* <TouchableWithoutFeedback onPress={() => setCollapsed(!collapsed)}>
          <View style={styles.btn}>
            {collapsed ? <ArrowUpIcon width={18} /> : <ArrowIcon width={18} />}
          </View>
        </TouchableWithoutFeedback>
        <Collapsible collapsed={collapsed}>
          <View style={styles.collapsibleWrapper}>
            <ScrollView></ScrollView>
          </View>
        </Collapsible> */}
        <View style={[styles.totalWrapper, {paddingVertical: 14}]}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalPrice}>
            {convertPrice(getSum().toString())} AED
          </Text>
        </View>
        <TouchableOpacity
          onPress={async () => {
            trigger();

            if (!user) {
              ToastAndroid.show('Please login to checkout', ToastAndroid.LONG);
              return;
            }
            if (products.length > 0) {
              dispatch(saveOrderInfo(getValues()));
              if (await schema.validate(getValues())) {
                // onSubmit(getValues());
                try {
                  setPaymentStatus(API_PROCESS.LOADING);
                  const order = await createOrderApi(
                    getValues(),
                    products.map(product => {
                      return {
                        productId: product.product.id,
                        quantity: `${product.quantity ?? 1}`,
                        color: `${product.colors ?? ''}`,
                        size: `${product.size ?? ''}`,
                      };
                    }),
                    val,
                  );
                  const datas = order.order;
                  console.log(order.data.id);
                  await initiateCardPayment(datas);
                  await confirmOrderAPI(order.data.id, 0);
                  setPaymentStatus(API_PROCESS.SUCCESS);
                } catch (error) {
                  console.log('error', error);

                  setPaymentStatus(API_PROCESS.FAIL);
                }
                return;
              } else {
                ToastAndroid.show(
                  'Please check your information',
                  ToastAndroid.LONG,
                );
              }
            } else {
              ToastAndroid.show(
                'Please add product to cart to checkout',
                ToastAndroid.LONG,
              );
            }
          }}>
          <View style={styles.checkoutBtn}>
            {paymentStatus === API_PROCESS.LOADING ? (
              <ActivityIndicator size={'small'} color={colors.white} />
            ) : (
              <Text style={styles.checkoutText}>Order</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  phoneWrapper: {
    flexDirection: 'row',
  },
  inputForm: {
    color: colors.mainTxt,
    borderColor: colors.description,
    borderWidth: 0.5,
    marginBottom: 15,
    height: 44,
    fontSize: 15,
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
  },
  formTitle: {
    color: colors.mainTxt,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  inputWrapper: {
    paddingBottom: 14,
  },
  inputTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.mainTxt,
    marginBottom: 8,
  },
  inputRequired: {
    color: 'red',
  },
  input: {
    borderColor: colors.mainTxt,
    color: colors.mainTxt,
    borderWidth: 0.5,
    height: 38,
    paddingHorizontal: 12,
    flex: 1,
  },
  priceContainer: {
    paddingHorizontal: 18,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: colors.green,
    marginTop: 20,
    paddingVertical: 12,
  },
  addressWrapper: {
    paddingHorizontal: 18,
  },
  collapsibleWrapper: {
    height: 300,
  },
  btn: {
    alignItems: 'center',
  },
  bottomWrapper: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    elevation: 2,
    zIndex: 1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.mainTxt,
    textTransform: 'uppercase',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.greenBlue,
  },
  checkoutBtn: {
    backgroundColor: colors.greenBlue,
    paddingVertical: 8,
    borderRadius: 20,
  },
  checkoutText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: colors.white,
    textTransform: 'uppercase',
  },
  priceMedium: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.green,
  },
  boldText: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.mainTxt,
    textTransform: 'uppercase',
  },
  mediumText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.mainTxt,
    textTransform: 'uppercase',
  },
  shippingNote: {
    fontSize: 15,
    textAlign: 'center',
    color: colors.red,
    fontStyle: 'italic',
    paddingTop: 8,
  },
  wrapperLine: {
    borderBottomWidth: 0.5,
  },
  freeShip: {
    color: colors.greenBlue,
    fontSize: 15,
    fontWeight: '600',
  },
  pWrapper: {
    paddingVertical: 13,
  },
  checkboxWrapper: {
    marginBottom: 12,
    gap: 6,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: -6,
  },
  checkboxContent: {},
  checkboxTitle: {
    color: colors.mainTxt,
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'none',
  },
});
