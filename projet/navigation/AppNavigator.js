import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from "../screens/Login/Login";
import InitializeUser from "../screens/InitializeUser/InitializeUserScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

export default createAppContainer(
  createSwitchNavigator({
    Auth: Login,
    InitializeUser: InitializeUser,
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
  },{
      initialRouteName: 'AuthLoading',
  })
);
