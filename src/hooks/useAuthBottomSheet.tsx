/* eslint-disable react/react-in-jsx-scope */
import {BottomSheetModal, useBottomSheetModal} from '@gorhom/bottom-sheet';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import loginBg from '../assets/images/loginBg.png';
import LoginForm from '../components/forms/LoginForm';
import {colors} from '../constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import RegisterForm from '../components/forms/RegisterForm';
import {useEffect, useRef} from 'react';
import {useReduxDispatch, useReduxSelector} from '../redux/store';
import {clearStatus} from '../redux/slices/user/userSlice';
import {API_PROCESS} from '../redux/enum';

export default function useAuthBottomSheet(ref: any) {
  const registerRef = useRef<BottomSheetModal>(null);
  const {dismissAll: dismissAllModals} = useBottomSheetModal();
  const dispatch = useReduxDispatch();
  const {registerStatus} = useReduxSelector(state => state.user);
  useEffect(() => {
    dispatch(clearStatus());
  }, []);

  useEffect(() => {
    if (registerStatus === API_PROCESS.SUCCESS) {
      dispatch(clearStatus());
      registerRef.current?.forceClose({duration: 500});
    }
  }, [registerStatus]);
  const closeAll = () => {
    ref.current?.forceClose({duration: 500});
    registerRef.current?.forceClose({duration: 500});
  };

  const openLoginSheet = () => {
    ref.current?.present({duration: 500});
  };
  const openRegisterSheet = () => {
    registerRef.current?.present({duration: 500});
  };

  const closeLoginSheet = () => {
    ref.current?.forceClose({duration: 500});
  };
  const closeRegisterSheet = () => {
    registerRef.current?.forceClose({duration: 500});
  };

  const renderLogin = () => {
    const snapPoints = ['95%', '95%'];

    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        onDismiss={() => {
          dismissAllModals();
        }}
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
                <Text style={styles.signInText}>Sign In</Text>
                <Text style={styles.welcome}>Welcome back</Text>
                <LoginForm />
                <View style={styles.signUpWrp}>
                  <Text style={styles.question}>Don't have an account ?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      closeLoginSheet();
                      openRegisterSheet();
                    }}>
                    <Text style={styles.signUp}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </BottomSheetModal>
    );
  };
  const renderRegister = () => {
    const snapPoints = ['95%', '95%'];

    return (
      <BottomSheetModal
        ref={registerRef}
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
                <Text style={styles.signInText}>Create Account</Text>
                <RegisterForm />
                <View style={styles.signUpWrp}>
                  <Text style={styles.question}>Already have an account ?</Text>
                  <TouchableOpacity
                    onPress={() => {
                      closeRegisterSheet();
                      //   openLoginSheet();
                    }}>
                    <Text style={styles.signUp}>Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </BottomSheetModal>
    );
  };
  return {renderLogin, closeAll, renderRegister, openLoginSheet};
}
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
