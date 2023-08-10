import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {StackParams} from './type';

type RouteParams<T extends keyof StackParams> = StackParams[T];

class NavigationService {
  private static navigationRef: React.RefObject<
    NavigationContainerRef<StackParams>
  >;

  static initialize(ref: React.RefObject<NavigationContainerRef<StackParams>>) {
    NavigationService.navigationRef = ref;
  }

  static navigate<T extends keyof StackParams>(
    routeName: keyof StackParams,
    params?: RouteParams<T>,
  ) {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      NavigationService.navigationRef.current.navigate(routeName as never);
    }
  }

  static push<T extends keyof StackParams>(
    routeName: keyof StackParams,
    params?: RouteParams<T>,
  ) {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      NavigationService.navigationRef.current.dispatch(
        StackActions.push(routeName, params),
      );
    }
  }

  static replace(routeName: string, params?: object) {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      NavigationService.navigationRef.current.dispatch(
        StackActions.replace(routeName, params),
      );
    }
  }

  static goBack() {
    NavigationService.navigationRef.current?.dispatch(CommonActions.goBack());
  }

  static pop() {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      NavigationService.navigationRef.current.dispatch(StackActions.pop());
    }
  }

  static canGoBack() {
    if (
      NavigationService.navigationRef &&
      NavigationService.navigationRef.current
    ) {
      const navigation = NavigationService.navigationRef.current;
      const canGoBack = navigation.canGoBack();
      return canGoBack;
    }

    return false;
  }

  static reset(routeName: keyof StackParams) {
    NavigationService.navigationRef.current?.dispatch(
      StackActions.replace(routeName),
    );
  }
}

export default NavigationService;
