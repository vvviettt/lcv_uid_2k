import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Cart: undefined;
  Wishlist: undefined;
  Setting: undefined;
};

export type PrivacyType = {
  type: 'privacy' | 'shipping' | 'refund';
};

export type StackParams = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: undefined;
  Register: undefined;
  ProductDetail: {productId: string};
  TermsOfService: PrivacyType;
  Checkout: undefined;
  Categories: undefined;
  BestSeller: undefined;
  NewArrivals: undefined;
  Search: undefined;
  MyAccount: undefined;
  OrderHistory: undefined;
  OrderHistoryDetail: {key: string};
  AboutUs: undefined;
  CurrencyData: undefined;
  FakeLocationData: undefined;
  LanguageData: undefined;
  Payment: {link: string};
};

export type NavigatorScreenParams<
  ParamList,
  State extends NavigationState = NavigationState,
> =
  | {
      screen?: never;
      params?: never;
      initial?: never;
      path?: string;
      state: PartialState<State> | State | undefined;
    }
  | {
      [RouteName in keyof ParamList]: undefined extends ParamList[RouteName]
        ? {
            screen: RouteName;
            params?: ParamList[RouteName];
            initial?: boolean;
            path?: string;
            state?: never;
          }
        : {
            screen: RouteName;
            params: ParamList[RouteName];
            initial?: boolean;
            path?: string;
            state?: never;
          };
    }[keyof ParamList];

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<StackParams>
  >;
