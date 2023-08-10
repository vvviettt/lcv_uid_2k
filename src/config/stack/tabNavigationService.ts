import {NavigationHelpers} from '@react-navigation/native';
import {RootTabParamList} from './type';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';

class TabNavigation {
  private static navigation: NavigationHelpers<
    RootTabParamList,
    BottomTabNavigationEventMap
  >;
  static initialize(
    nav: NavigationHelpers<RootTabParamList, BottomTabNavigationEventMap>,
  ) {
    this.navigation = nav;
  }

  static push(tabName: keyof RootTabParamList, params: any) {
    this.navigation.navigate(tabName, params);
  }
}

export default TabNavigation;
