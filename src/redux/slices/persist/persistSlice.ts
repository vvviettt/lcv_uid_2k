import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AutoFillForm, PersistState} from './persist.type';
const initialState: PersistState = {
  orderAutofill: {},
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
  },
});

export const {updateOrderAutofill, clearOrderAutofill} = persistSlice.actions;
export default persistSlice.reducer;
