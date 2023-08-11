import {View, Switch} from 'react-native';
import React, {useState} from 'react';
import {SettingItemProps} from './SettingItem/SettingItem.type';
import SettingItem from './SettingItem';
import {colors} from '../../constants/colors';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {logout} from '../../redux/slices/user/userSlice';
import Dialog from 'react-native-dialog';

const SettingScreen = () => {
  const [visible, setVisible] = useState(false);
  const [notificationEnable, setNotificationEnable] = useState(true);
  const {user} = useReduxSelector(state => state.user);
  const dispatch = useReduxDispatch();
  const list: SettingItemProps[] = [
    {name: 'About Us', onPress: () => {}},
    {name: 'Terms And Service ', onPress: () => {}},
    {name: 'Privacy Policy', onPress: () => {}},
    {name: 'Contact us', onPress: () => {}},
    {name: 'Like us on Facebook', onPress: () => {}},
    {name: 'Follow us on Instagram', onPress: () => {}},
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
        }
      },
    },
  ];
  return (
    <View>
      {list.map((item, index) => {
        return <SettingItem {...item} key={index} />;
      })}
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
            }
          }}
          label="Log out"
        />
      </Dialog.Container>
    </View>
  );
};

export default SettingScreen;
