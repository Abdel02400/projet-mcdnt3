import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import IconFont from "react-native-vector-icons/FontAwesome";
import IconAnt from "react-native-vector-icons/AntDesign";

import ProfilScreen from '../screens/Profil/ProfilScreen';
import ActualityScreen from '../screens/Actuality/ActualityScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ChatScreen from '../screens/Chat/ChatScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ActualityStack = createStackNavigator(
  {
    Actuality: ActualityScreen,
  },
  config
);

ActualityStack.navigationOptions = {
  tabBarLabel: 'Fil d\'actualité',
  tabBarIcon: ({ focused }) => (
    <IconFont
        name="newspaper-o"
        size={25}
    />
  ),
};

ActualityStack.path = '';

const ChatStack = createStackNavigator(
    {
        Chat: ChatScreen,
    },
    config
);

ChatStack.navigationOptions = {
    tabBarLabel: 'Mes messages',
    tabBarIcon: ({ focused }) => (
        <IconAnt
            name="message1"
            size={25}
        />
    ),
};

ChatStack.path = '';

const ProfilStack = createStackNavigator(
  {
    Profil: ProfilScreen,
  },
  config
);

ProfilStack.navigationOptions = {
  tabBarLabel: 'Mon profil',
  tabBarIcon: ({ focused }) => (
      <IconMat
          name="face-profile"
          size={25}
      />
  ),
};

ProfilStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Mes paramètres',
  tabBarIcon: ({ focused }) => (
      <IconAnt
          name="setting"
          size={25}
      />  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  ActualityStack,
  ProfilStack,
  ChatStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
