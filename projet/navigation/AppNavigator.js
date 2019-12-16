import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Login from "../screens/Login/Login";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

export default createAppContainer(
  createSwitchNavigator({
    Auth: Login,
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
  },{
      initialRouteName: 'AuthLoading',
  })
);
