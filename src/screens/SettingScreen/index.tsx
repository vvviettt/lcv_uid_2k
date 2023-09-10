import {View, Switch, Linking, ScrollView, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SettingItemProps} from './SettingItem/SettingItem.type';
import SettingItem from './SettingItem';
import {colors} from '../../constants/colors';
import {useReduxSelector} from '../../redux/store';
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

const SettingScreen = () => {
  const [notificationEnable, setNotificationEnable] = useState(true);
  const ref = useRef<BottomSheetModal>(null);
  const {renderLogin, openLoginSheet, renderRegister, closeAll} =
    useAuthBottomSheet(ref);
  const {user} = useReduxSelector(state => state.user);
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
        }
      },
      icon: <Image style={{width: 20, height: 20}} source={OrderIcon} />,
    },
    {
      name: 'About Us',
      onPress: () => {},
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
      onPress: () => {},
      subElement: (
        <Switch
          value={notificationEnable}
          thumbColor={colors.green}
          trackColor={{true: colors.greenBlue}}
          onValueChange={value => setNotificationEnable(value)}
        />
      ),
    },
    {
      name: 'Currency',
      icon: <Image style={{width: 20, height: 20}} source={currencyIcon} />,
      onPress: () => {},
    },
    {
      name: 'Location',
      icon: <Image style={{width: 20, height: 20}} source={locationIcon} />,
      onPress: () => {},
    },
    {
      name: 'Language',
      icon: <Image style={{width: 20, height: 20}} source={languageIcon} />,
      onPress: () => {},
    },
  ];

  return (
    <View>
      <ScrollView>
        {list.map((item, index) => {
          return <SettingItem {...item} key={index} />;
        })}
      </ScrollView>
      {renderLogin()}
      {renderRegister()}
    </View>
  );
};

export default SettingScreen;
