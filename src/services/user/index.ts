import axios, {AxiosError} from 'axios';
import {RegisterFormField} from '../../components/forms/RegisterForm/RegisterForm.type';
import httpClient from '../httpClient';
import {userEndPoint} from './endpoint';
import {LoginFormField} from '../../components/forms/LoginForm/LoginForm.type';
import {IUser} from '../../redux/slices/user/user.type';
import {ChangePassFormField} from '../../components/forms/ChangePassForm/ChangePassForm.type';
import {ToastAndroid} from 'react-native';

export const registerApi = async (
  data: RegisterFormField,
): Promise<boolean> => {
  try {
    const res = await httpClient.post(userEndPoint.register, {...data});
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        ((error as AxiosError).response?.data as any)?.messageContent ??
        'Unknown  error.'
      );
    }
    throw 'Unknown  error.';
  }
};

export const loginApi = async (data: LoginFormField): Promise<IUser> => {
  try {
    const res = await httpClient.post(userEndPoint.login, {...data});
    return res.data.results as IUser;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        ((error as AxiosError).response?.data as any)?.messageContent ?? '',
      );
    }
    throw new Error('Unknown  error.');
  }
};

export const deleteAccount = async () => {
  try {
    const res = await httpClient.post(userEndPoint.delete);
    console.log(res.data);

    return;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        ((error as AxiosError).response?.data as any)?.messageContent ?? '',
      );
    }
    throw new Error('Unknown  error.');
  }
};

export const changePasswordAccount = async (data: ChangePassFormField) => {
  try {
    const res = await httpClient.post(userEndPoint.changePassword, data);
    return;
  } catch (error) {
    console.log((error as AxiosError).response?.data);

    if (axios.isAxiosError(error)) {
      ToastAndroid.show(
        ((error as AxiosError).response?.data as any)?.message ?? '',
        ToastAndroid.CENTER,
      );
    } else {
      ToastAndroid.show('Unknown  error.', ToastAndroid.CENTER);
    }
    throw new Error('Error');
  }
};

export const forgotPassword = async (data: {email: string}) => {
  return await httpClient.post(userEndPoint.forgot, data);
};
