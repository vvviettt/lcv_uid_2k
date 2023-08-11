import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import useAuthBottomSheet from '../../hooks/useAuthBottomSheet';
import {useReduxSelector} from '../../redux/store';
import {useFocusEffect} from '@react-navigation/native';

const WishlistScreen = ({navigation}) => {
  const ref = useRef<BottomSheetModal>(null);
  const {renderLogin, openLoginSheet, renderRegister, closeAll} =
    useAuthBottomSheet(ref);
  const {user} = useReduxSelector(state => state.user);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!user) {
        openLoginSheet();
      }
    });
    if (user) {
      closeAll();
    }
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, user]);
  return (
    <View>
      <TouchableOpacity onPress={() => {}}></TouchableOpacity>
      {renderRegister()}
      {renderLogin()}
    </View>
  );
};

export default WishlistScreen;
