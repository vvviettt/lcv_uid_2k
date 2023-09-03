import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import staticSlice from './slices/static/staticSlice';
import categorySlice from './slices/category/categorySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import cartSlice from './slices/cart/cartSlice';
import userSlice from './slices/user/userSlice';
import persistSlice from './slices/persist/persistSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['cart', 'user'],
};

const rootReducer = combineReducers({
  static: staticSlice,
  category: categorySlice,
  cart: cartSlice,
  user: userSlice,
  persist: persistSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
export const getState = store.getState;
export const persistor = persistStore(store);
