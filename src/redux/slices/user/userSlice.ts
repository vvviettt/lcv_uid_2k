import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_PROCESS} from '../../enum';

import {UserState} from './user.type';
import {RegisterFormField} from '../../../components/forms/RegisterForm/RegisterForm.type';
import {loginApi, registerApi} from '../../../services/user';
import {ToastAndroid} from 'react-native';
import {LoginFormField} from '../../../components/forms/LoginForm/LoginForm.type';

const initialState: UserState = {
  loginStatus: API_PROCESS.INITIAL,
  registerStatus: API_PROCESS.SUCCESS,
};

export const register = createAsyncThunk<
  any,
  RegisterFormField,
  {rejectValue: string}
>('auth/register', async (data, {rejectWithValue}) => {
  try {
    return await registerApi(data);
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const login = createAsyncThunk<
  any,
  LoginFormField,
  {rejectValue: string}
>('auth/login', async (data, {rejectWithValue}) => {
  try {
    return await loginApi(data);
  } catch (error) {
    return rejectWithValue((error as any).message);
  }
});

const userSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearStatus: state => {
      state.loginStatus = API_PROCESS.INITIAL;
      state.registerStatus = API_PROCESS.INITIAL;
    },
    logout: state => {
      state.user = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.registerStatus = API_PROCESS.LOADING;
    });
    builder.addCase(register.rejected, (state, {payload}) => {
      state.registerStatus = API_PROCESS.FAIL;
      ToastAndroid.show(payload ?? "Can't sign up.", ToastAndroid.SHORT);
    });
    builder.addCase(register.fulfilled, state => {
      state.registerStatus = API_PROCESS.SUCCESS;
    });
    builder.addCase(login.pending, state => {
      state.loginStatus = API_PROCESS.LOADING;
    });
    builder.addCase(login.rejected, (state, {payload}) => {
      state.loginStatus = API_PROCESS.FAIL;
      ToastAndroid.show(payload ?? "Can't sign in.", ToastAndroid.SHORT);
    });
    builder.addCase(login.fulfilled, (state, {payload}) => {
      state.loginStatus = API_PROCESS.SUCCESS;
      state.user = payload;
    });
  },
});

export const {clearStatus, logout} = userSlice.actions;
export default userSlice.reducer;
