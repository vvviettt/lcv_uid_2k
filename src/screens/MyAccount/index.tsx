import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import TextHeader from '../../components/TextHeader';
import {SettingItemProps} from '../SettingScreen/SettingItem/SettingItem.type';
import SettingItem from '../SettingScreen/SettingItem';
import Dialog from 'react-native-dialog';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import changePassIcon from '../../assets/images/changepass.png';
import deleteIcon from '../../assets/images/delete_account.png';
import loginIcon from '../../assets/images/logout.png';
import loginBg from '../../assets/images/loginBg.png';
import {useReduxDispatch, useReduxSelector} from '../../redux/store';
import {logout} from '../../redux/slices/user/userSlice';
import NavigationService from '../../config/stack/navigationService';
import {deleteAccount} from '../../services/user';
import {colors} from '../../constants/colors';
import useAuthBottomSheet from '../../hooks/useAuthBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import RegisterForm from '../../components/forms/RegisterForm';
import ChangePassForm from '../../components/forms/ChangePassForm';
import {clearOrderAutofill} from '../../redux/slices/persist/persistSlice';

const MyAccount = () => {
  const dispatch = useReduxDispatch();
  const {user} = useReduxSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const changeRef = useRef<BottomSheetModal>(null);

  const renderChangePassword = () => {
    const snapPoints = ['95%', '95%'];

    return (
      <BottomSheetModal
        ref={changeRef}
        index={1}
        snapPoints={snapPoints}
        handleStyle={{
          backgroundColor: colors.green,
          borderTopEndRadius: 12,
          borderTopStartRadius: 12,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive">
          <View style={styles.wrapper}>
            <Image style={styles.imgBg} source={loginBg} />
            <View style={styles.formWrapper}>
              <View>
                <Text style={styles.signInText}>Change Password</Text>
                <ChangePassForm
                  onSuccess={() => {
                    changeRef.current?.close();
                    ToastAndroid.show(
                      'Change password successfully',
                      ToastAndroid.CENTER,
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </BottomSheetModal>
    );
  };

  useEffect(() => {
    if (!user) {
      NavigationService.pop();
    }
  }, [user]);
  const handleDeleteAccount = useCallback(async () => {
    try {
      setLoading(true);
      await deleteAccount();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);
  const renderLogoutDialog = useCallback(() => {
    return (
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
              dispatch(clearOrderAutofill());
              setVisible(false);
            }
          }}
          label="Log out"
        />
      </Dialog.Container>
    );
  }, [visible]);

  const renderDeleteAccountDialog = useCallback(() => {
    return (
      <Dialog.Container visible={deleteVisible}>
        <Dialog.Title>Delete account</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone and all data will be delete.Are you sure
          you want delete account?
        </Dialog.Description>
        <Dialog.Button
          onPress={() => {
            setDeleteVisible(false);
          }}
          label="Cancel"
        />
        <Dialog.Button
          onPress={() => {
            if (user) {
              handleDeleteAccount();
              setDeleteVisible(false);
            }
          }}
          label="Delete"
        />
      </Dialog.Container>
    );
  }, [deleteVisible]);
  const list: SettingItemProps[] = [
    {
      name: 'Change Password',
      icon: <Image style={{width: 20, height: 20}} source={changePassIcon} />,
      onPress: () => {
        changeRef?.current?.present();
      },
    },
    {
      name: 'Delete Account',
      icon: <Image style={{width: 20, height: 20}} source={deleteIcon} />,
      onPress: () => {
        setDeleteVisible(true);
      },
    },
    {
      name: 'Logout',
      icon: <Image style={{width: 20, height: 20}} source={loginIcon} />,
      onPress: () => {
        setVisible(true);
      },
    },
  ];

  return (
    <SafeAreaView>
      <TextHeader title="My Account" />
      <ScrollView>
        <View>
          {list.map((item, index) => {
            return <SettingItem {...item} key={index} />;
          })}
        </View>
      </ScrollView>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0,0,0.3)',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={colors.green} size={'large'} />
        </View>
      )}
      {renderLogoutDialog()}
      {renderDeleteAccountDialog()}
      {renderChangePassword()}
    </SafeAreaView>
  );
};
export default MyAccount;

const styles = StyleSheet.create({
  wrapper: {
    // position: 'relative',
    // justifyContent: 'flex-end',
  },
  imgBg: {
    width: '100%',
    marginTop: -70,
    left: 0,
    right: 0,
  },
  formWrapper: {
    marginTop: -30,
    marginHorizontal: 20,
  },
  signInText: {
    fontSize: 24,
    fontWeight: '400',
    color: colors.mainTxt,
  },
  welcome: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
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
