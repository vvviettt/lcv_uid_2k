export interface PersistState {
  orderAutofill: AutoFillForm;
  enableNotification: boolean;
  currency: Currency;
  language: Languages;
  location: Locations;
}

export interface AutoFillForm {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export enum Currency {
  AED = 'AED',
  USD = 'USD',
  EURO = 'EURO',
}

export enum Languages {
  English = 'English',
  Arabic = 'Arabic',
}

export enum Locations {
  UAE = 'United Arab Emirates',
}
