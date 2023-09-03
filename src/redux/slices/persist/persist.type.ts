export interface PersistState {
  orderAutofill: AutoFillForm;
}

export interface AutoFillForm {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}
