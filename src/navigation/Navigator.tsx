import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsScreen from '../screens/NewsScreen';
import OneNews from '../screens/OneNews';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '../hooks/redux-hooks';

export type StackParams = {
  Profile: undefined;
  NewsScreenStack: NewsStackParams;
  OneNews: {
    id: number;
    title: string;
  };
};

export type LoginStackParams = {
  Login: undefined;
};
export type NewsStackParams = {
  News: undefined;
  OneNews: {
    id: number;
    title: string;
  };
};

const Tab = createBottomTabNavigator<StackParams>();
const NewsStack = createNativeStackNavigator<NewsStackParams>();
const LoginStack = createNativeStackNavigator<LoginStackParams>();

const NewsScreenTab = () => {
  return (
    <NewsStack.Navigator initialRouteName="News">
      <NewsStack.Screen name="News" component={NewsScreen} />
      <NewsStack.Screen name="OneNews" component={OneNews} />
    </NewsStack.Navigator>
  );
};

const Navigator = () => {
  const isAuth = useAppSelector(state => state.user.user);

  return (
    <NavigationContainer>
      {isAuth ? (
        <Tab.Navigator initialRouteName="NewsScreenStack">
          <Tab.Screen
            name="NewsScreenStack"
            component={NewsScreenTab}
            options={{headerShown: false}}
          />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <LoginStack.Navigator>
          <LoginStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </LoginStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
