/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParams} from './type';
import {FC, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  DefaultTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import NavigationService from './navigationService';
import HomeIcon from '../../assets/svgs/home.svg';
import HomeSelectedIcon from '../../assets/svgs/home_selection.svg';
import ExploreIcon from '../../assets/svgs/explore.svg';
import ExploreSelectedIcon from '../../assets/svgs/explore_selection.svg';
import CartIcon from '../../assets/svgs/cart.svg';
import CartSelectedIcon from '../../assets/svgs/cart_selection.svg';
import WishlistIcon from '../../assets/svgs/wishlist.svg';
import WishlistSelectedIcon from '../../assets/svgs/wishlist_selection.svg';
import SettingIcon from '../../assets/svgs/setting.svg';
import SettingSelectedIcon from '../../assets/svgs/setting_selection.svg';
import SettingScreen from '../../screens/SettingScreen';
import HomeScreen from '../../screens/HomeScreen';
import CartScreen from '../../screens/CartScreen';
import WishlistScreen from '../../screens/WishlistScreen';
import TabNavigation from './tabNavigationService';
import {colors} from '../../constants/colors';
import ExploreScreen from '../../screens/ExploreScreen';
import ProductDetail from '../../screens/ProductDetailtScreen';
import {useReduxSelector} from '../../redux/store';
import TermsOfServiceScreen from '../../screens/TermsOfServices';
import BackIcon from '../../assets/svgs/back.svg';
import CheckOutScreen from '../../screens/CheckOutScreen';
import CategoriesScreen from '../../screens/CategogiesScreen';
import BestSellerScreen from '../../screens/BestSeller';
import NewArrivalsScreen from '../../screens/NewArrivalsScreen';
import SearchScreen from '../../screens/SearchScreen';
import MyAccount from '../../screens/MyAccount';
import OrderHistory from '../../screens/OrderHistory';
import OrderDetail from '../../screens/OrderDetail';
import AboutUs from '../../screens/AboutUs';

const Stack = createNativeStackNavigator<StackParams>();
const Tab = createBottomTabNavigator();

const RootNavigation: FC = () => {
  const navigationRef = useRef<NavigationContainerRef<StackParams>>(null);
  NavigationService.initialize(navigationRef);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      background: '#fff',
    },
  };
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen
          options={{headerShown: false}}
          name="Root"
          component={TabNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="ProductDetail"
          component={ProductDetail}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Categories"
          component={CategoriesScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="BestSeller"
          component={BestSellerScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NewArrivals"
          component={NewArrivalsScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Search"
          component={SearchScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="MyAccount"
          component={MyAccount}
        />
        <Stack.Screen
          options={({route}) => {
            let title = '';
            if (route.params.type === 'privacy') {
              title = 'Privacy Policy';
            } else if (route.params.type === 'refund') {
              title = ' Refund Policy';
            } else {
              title = 'Shipping Policy';
            }
            return {
              headerTitle: title,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: colors.green,
                fontSize: 20,
                fontWeight: '500',
              },
              // headerBackVisible: false,
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <BackIcon />
                  </TouchableOpacity>
                );
              },
            };
          }}
          name="TermsOfService"
          component={TermsOfServiceScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: 'Checkout',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colors.green,
              fontSize: 20,
              fontWeight: '500',
            },
            headerShadowVisible: false,
            // headerBackVisible: false,
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => NavigationService.goBack()}>
                  <BackIcon />
                </TouchableOpacity>
              );
            },
          }}
          name="Checkout"
          component={CheckOutScreen}
        />
        <Stack.Screen
          options={({route}) => {
            return {
              headerTitle: route.params.key,
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: colors.green,
                fontSize: 20,
                fontWeight: '500',
              },
              headerShadowVisible: false,
              // headerBackVisible: false,
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <BackIcon />
                  </TouchableOpacity>
                );
              },
            };
          }}
          name="OrderHistoryDetail"
          component={OrderDetail}
        />
        <Stack.Screen
          options={() => {
            return {
              headerTitle: 'About Us',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                color: colors.green,
                fontSize: 20,
                fontWeight: '500',
              },
              headerShadowVisible: false,
              // headerBackVisible: false,
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => NavigationService.goBack()}>
                    <BackIcon />
                  </TouchableOpacity>
                );
              },
            };
          }}
          name="AboutUs"
          component={AboutUs}
        />
        <Stack.Screen
          options={{
            headerTitle: 'History Order',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: colors.green,
              fontSize: 20,
              fontWeight: '500',
            },
            headerShadowVisible: false,
            // headerBackVisible: false,
            headerLeft: () => {
              return (
                <TouchableOpacity onPress={() => NavigationService.goBack()}>
                  <BackIcon />
                </TouchableOpacity>
              );
            },
          }}
          name="OrderHistory"
          component={OrderHistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabNavigator: FC = (props: any) => {
  TabNavigation.initialize(props.navigation);
  const {products} = useReduxSelector(state => state.cart);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={({state, navigation, descriptors}) => {
        // setNavigation(navigation);
        return (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'space-between',
              width: Dimensions.get('window').width,
              paddingBottom: 20,
              paddingTop: 10,
              paddingHorizontal: 20,
              elevation: 9,
              borderTopWidth: 1,
              borderTopColor: 'rgba(0,0,0,0.1)',
            }}>
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;
              const {options} = descriptors[route.key];
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };
              return (
                <TouchableOpacity
                  key={index}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? {selected: true} : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View>
                      {options.tabBarIcon!({
                        focused: isFocused,
                        color: '',
                        size: 0,
                      })}
                      {route.name === 'Cart' && products.length > 0 && (
                        <View
                          style={{
                            position: 'absolute',
                            left: '70%',
                            bottom: '50%',
                            backgroundColor: colors.cartCount,
                            width: 20,
                            height: 20,
                            borderRadius: 24,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 12, color: colors.white}}>
                            {products.length}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text
                      style={{
                        color: isFocused ? colors.green : colors.description,
                      }}>
                      {route.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <HomeSelectedIcon />
              </View>
            ) : (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <HomeIcon />
              </View>
            ),
          tabBarIconStyle: {
            // marginTop: 5,
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ExploreSelectedIcon />
              </View>
            ) : (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ExploreIcon />
              </View>
            ),
        }}
        name="Explore"
        component={ExploreScreen}
      />
      <Tab.Screen
        options={{
          // headerShown: false,
          title: 'My Cart',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.green,
            fontSize: 20,
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CartSelectedIcon />
              </View>
            ) : (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CartIcon />
              </View>
            ),
        }}
        name="Cart"
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          title: 'Wishlist',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.green,
            fontSize: 20,
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <WishlistSelectedIcon />
              </View>
            ) : (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <WishlistIcon />
              </View>
            ),
        }}
        name="Wishlist"
        component={WishlistScreen}
      />
      <Tab.Screen
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.green,
            fontSize: 20,
            fontWeight: '500',
          },
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SettingSelectedIcon />
              </View>
            ) : (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 1000,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SettingIcon />
              </View>
            ),
        }}
        name="Settings"
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
};

export default RootNavigation;
