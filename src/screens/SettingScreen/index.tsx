import {
  View,
  Switch,
  Linking,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SettingItemProps} from './SettingItem/SettingItem.type';
import SettingItem from './SettingItem';
import {colors} from '../../constants/colors';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import NavigationService from '../../config/stack/navigationService';
import useAuthBottomSheet from '../../hooks/useAuthBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import AboutIcon from '../../assets/images/about-us.png';
import privacyIcon from '../../assets/images/privacy.png';
import shippingIcon from '../../assets/images/shiping-policy.png';
import returnIcon from '../../assets/images/return.png';
import mailIcon from '../../assets/images/mail.png';
import fbIcon from '../../assets/images/facebook_black.png';
import instaIcon from '../../assets/images/insta.png';
import notificationIcon from '../../assets/images/notification.png';
import currencyIcon from '../../assets/images/curency.png';
import locationIcon from '../../assets/images/location.png';
import languageIcon from '../../assets/images/language.png';
import loginIcon from '../../assets/images/login.png';
import accountIcon from '../../assets/images/my-account.png';
import nextIcon from '../../assets/images/next-icon.png';
import OrderIcon from '../../assets/images/orders-icon.png';
import {
  changeCurrency,
  changeLanguage,
  changeLocation,
  switchEnableNotification,
} from '../../redux/slices/persist/persistSlice';
import {
  Currency,
  Languages,
  Locations,
} from '../../redux/slices/persist/persist.type';
import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const SettingScreen = () => {
  const ref = useRef<BottomSheetModal>(null);
  const {renderLogin, openLoginSheet, renderRegister, closeAll} =
    useAuthBottomSheet(ref);
  const {user} = useReduxSelector(state => state.user);
  const {location, language, currency, enableNotification} = useReduxSelector(
    state => state.persist,
  );
  const dispatch = useReduxDispatch();
  useEffect(() => {
    if (user) {
      closeAll();
    }
  }, [user]);

  const list: SettingItemProps[] = [
    {
      name: user ? 'My Account' : 'Sign in',
      onPress: () => {
        if (user) {
          NavigationService.push('MyAccount');
        } else {
          openLoginSheet();
        }
      },
      icon: user ? (
        <Image style={{width: 20, height: 20}} source={accountIcon} />
      ) : (
        <Image style={{width: 20, height: 20}} source={loginIcon} />
      ),
      subElement: !user ? (
        <></>
      ) : (
        <Image style={{width: 16, height: 16}} source={nextIcon} />
      ),
    },
    {
      name: user ? 'History Order' : 'Current Order',
      onPress: () => {
        if (user) {
          NavigationService.push('OrderHistory');
        } else {
          openLoginSheet();
        }
      },
      icon: <Image style={{width: 20, height: 20}} source={OrderIcon} />,
    },
    {
      name: 'About Us',
      onPress: () => {
        NavigationService.push('AboutUs');
      },
      icon: <Image style={{width: 20, height: 20}} source={AboutIcon} />,
    },
    {
      icon: <Image style={{width: 20, height: 20}} source={privacyIcon} />,
      name: 'Privacy Policy',
      onPress: () => {
        NavigationService.push('TermsOfService', {
          type: 'privacy',
        });
      },
    },
    {
      name: 'Shipping Policy',
      icon: <Image style={{width: 20, height: 20}} source={shippingIcon} />,
      onPress: () => {
        NavigationService.push('TermsOfService', {
          type: 'shipping',
        });
      },
    },
    {
      name: 'Refund Policy',
      icon: <Image style={{width: 20, height: 20}} source={returnIcon} />,
      onPress: () => {
        NavigationService.push('TermsOfService', {
          type: 'refund',
        });
      },
    },
    {
      name: 'Contact us',
      icon: <Image style={{width: 20, height: 20}} source={mailIcon} />,
      onPress: () => {
        Linking.openURL('mailto:info@alahasdiamante.com');
      },
    },
    {
      name: 'Like us on Facebook',
      icon: <Image style={{width: 20, height: 20}} source={fbIcon} />,
      onPress: () => {
        Linking.openURL('fb://profile/61550271264740/').catch(() => {
          Linking.openURL(
            'https://www.facebook.com/profile.php?id=61550271264740',
          );
        });
      },
    },
    {
      name: 'Follow us on Instagram',
      icon: <Image style={{width: 20, height: 20}} source={instaIcon} />,
      onPress: () => {
        Linking.openURL('instagram://user?username=alahasdiamante').catch(
          () => {
            Linking.openURL('https://www.instagram.com/alahasdiamante');
          },
        );
      },
    },
    {
      name: 'Notification',
      icon: <Image style={{width: 20, height: 20}} source={notificationIcon} />,
      onPress: () => {
        dispatch(switchEnableNotification());
      },
      subElement: (
        <Switch
          value={enableNotification}
          thumbColor={colors.green}
          trackColor={{true: colors.greenBlue}}
          onValueChange={() => {
            dispatch(switchEnableNotification());
          }}
        />
      ),
    },
    {
      name: 'Currency',
      icon: <Image style={{width: 20, height: 20}} source={currencyIcon} />,
      onPress: () => {
        setShowModal('CURRENCY');
      },
    },
    {
      name: 'Location',
      icon: <Image style={{width: 20, height: 20}} source={locationIcon} />,
      onPress: () => {
        setShowModal('LOCATION');
      },
    },
    {
      name: 'Language',
      icon: <Image style={{width: 20, height: 20}} source={languageIcon} />,
      onPress: () => {
        setShowModal('LANGUAGE');
      },
    },
  ];
  const [showModal, setShowModal] = useState<
    'CURRENCY' | 'LOCATION' | 'LANGUAGE' | null
  >(null);

  const items = useMemo(() => {
    switch (showModal) {
      case 'CURRENCY':
        return Currency;
      case 'LANGUAGE':
        return Languages;

      case 'LOCATION':
        return Locations;

      default:
        return null;
    }
  }, [showModal]);
  const label = useMemo(() => {
    switch (showModal) {
      case 'CURRENCY':
        return 'Select currency';
      case 'LANGUAGE':
        return 'Select Language';

      case 'LOCATION':
        return 'Select location';

      default:
        return '';
    }
  }, [showModal]);
  const checkChecked = useCallback(
    (i: any) => {
      if (showModal === 'CURRENCY') {
        return (
          (!currency && i === Currency.AED) || (currency && currency === i)
        );
      } else if (showModal === 'LANGUAGE') {
        return (
          (!language && i === Languages.English) || (language && language === i)
        );
      } else if (showModal === 'LOCATION') {
        return (
          (!location && i === Locations.UAE) || (location && location === i)
        );
      }
      return false;
    },
    [currency, language, location, showModal],
  );

  const action = useCallback(
    (i: any) => {
      if (showModal === 'CURRENCY') {
        dispatch(changeCurrency({currency: i}));
      } else if (showModal === 'LANGUAGE') {
        dispatch(changeLanguage({language: i}));
      } else if (showModal === 'LOCATION') {
        dispatch(changeLocation({location: i}));
      }
    },
    [dispatch, showModal],
  );

  const renderCurrencyDialog = useCallback(() => {
    return (
      <View>
        <Modal
          isVisible={!!showModal}
          customBackdrop={
            <TouchableWithoutFeedback
              onPress={() => {
                setShowModal(null);
              }}>
              <View style={styles.modalDimiss} />
            </TouchableWithoutFeedback>
          }>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{label}</Text>
            {items &&
              Object.values(items).map(i => {
                return (
                  <BouncyCheckbox
                    key={i}
                    size={18}
                    disableBuiltInState
                    text={i}
                    textStyle={styles.checkbox}
                    fillColor={colors.green}
                    isChecked={checkChecked(i)}
                    onPress={() => {
                      action(i);
                    }}
                  />
                );
              })}
          </View>
        </Modal>
      </View>
    );
  }, [showModal, label, items, checkChecked, action]);
  return (
    <View>
      <ScrollView>
        {list.map((item, index) => {
          return <SettingItem {...item} key={index} />;
        })}
      </ScrollView>
      {renderLogin()}
      {renderRegister()}
      {renderCurrencyDialog()}
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  checkbox: {
    fontSize: 15,
    color: colors.mainTxt,
    textDecorationLine: 'none',
  },
  modalDimiss: {flex: 1, backgroundColor: colors.mainTxt},
  modalView: {
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.mainTxt,
  },
});
