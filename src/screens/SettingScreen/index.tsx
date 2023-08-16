import {View, Switch, Linking} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SettingItemProps} from './SettingItem/SettingItem.type';
import SettingItem from './SettingItem';
import {colors} from '../../constants/colors';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {logout} from '../../redux/slices/user/userSlice';
import Dialog from 'react-native-dialog';
import NavigationService from '../../config/stack/navigationService';
import useAuthBottomSheet from '../../hooks/useAuthBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const SettingScreen = () => {
  const [visible, setVisible] = useState(false);
  const [notificationEnable, setNotificationEnable] = useState(true);
  const dispatch = useReduxDispatch();
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
    {name: 'About Us', onPress: () => {}},
    {
      name: 'Privacy Policy',
      onPress: () => {
        NavigationService.push('TermsOfService', {
          type: 'privacy',
        });
      },
    },
    {
      name: 'Shipping Policy',
      onPress: () => {
        NavigationService.push('TermsOfService', {
          type: 'shipping',
        });
      },
    },
    {
      name: 'Refund Policy',
      onPress: () => {
        NavigationService.push('TermsOfService', {
          type: 'refund',
        });
      },
    },
    {
      name: 'Contact us',
      onPress: () => {
        Linking.openURL('mailto:info@alahasdiamante.com');
      },
    },
    {
      name: 'Like us on Facebook',
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
    {name: 'Currency', onPress: () => {}},
    {name: 'Location', onPress: () => {}},
    {name: 'Language', onPress: () => {}},
    {
      name: !user ? 'Sign in' : 'Log out',
      onPress: () => {
        if (user) {
          setVisible(true);
        } else {
          openLoginSheet();
        }
      },
    },
  ];

  return (
    <View>
      {list.map((item, index) => {
        return <SettingItem {...item} key={index} />;
      })}
      {renderLogin()}
      {renderRegister()}
      <Dialog.Container visible={visible}>
        <Dialog.Title>Log out</Dialog.Title>
        <Dialog.Description>Do you want to log out?</Dialog.Description>
        <Dialog.Button
          onPress={() => {
            setVisible(false);
          }}
          label="Cancel"
        />
        <Dialog.Button
          onPress={() => {
            if (user) {
              dispatch(logout());
              setVisible(false);
            }
          }}
          label="Log out"
        />
      </Dialog.Container>
    </View>
  );
};

export default SettingScreen;
