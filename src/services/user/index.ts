import axios, {AxiosError} from 'axios';
import {RegisterFormField} from '../../components/forms/RegisterForm/RegisterForm.type';
import httpClient from '../httpClient';
import {userEndPoint} from './endpoint';
import {LoginFormField} from '../../components/forms/LoginForm/LoginForm.type';
import {IUser} from '../../redux/slices/user/user.type';

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
