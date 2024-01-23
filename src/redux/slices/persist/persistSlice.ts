import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {
  AutoFillForm,
  Currency,
  Languages,
  Locations,
  PersistState,
} from './persist.type';
const initialState: PersistState = {
  orderAutofill: {},
  location: Locations.UAE,
  language: Languages.English,
  currency: Currency.AED,
  enableNotification: false,
};

const persistSlice = createSlice({
  name: 'persist',
  initialState,
  reducers: {
    updateOrderAutofill: (state, payload: PayloadAction<AutoFillForm>) => {
      state.orderAutofill = payload.payload;
    },
    clearOrderAutofill: state => {
      state.orderAutofill = {};
    },
    switchEnableNotification: state => {
      state.enableNotification = !state.enableNotification;
    },
    changeLocation: (state, payload: PayloadAction<{location: Locations}>) => {
      state.location = payload.payload.location;
    },
    changeLanguage: (state, payload: PayloadAction<{language: Languages}>) => {
      state.language = payload.payload.language;
    },
    changeCurrency: (state, payload: PayloadAction<{currency: Currency}>) => {
      state.currency = payload.payload.currency;
    },
  },
});

export const {
  updateOrderAutofill,
  clearOrderAutofill,
  switchEnableNotification,
  changeCurrency,
  changeLanguage,
  changeLocation,
} = persistSlice.actions;
export default persistSlice.reducer;
