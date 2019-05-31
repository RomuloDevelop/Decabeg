import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, NavigationActions } from 'react-navigation';
import { IconNB, Icon, Button, Text } from 'native-base';
import HomeDrawerStack from './HomeDrawerStack';
import ConfigurationStack from './ConfigurationStack';

import globalStyles from '../styles';

const HomeStack = createStackNavigator({
  homeDrawer: {
    screen: HomeDrawerStack,
    navigationOptions:{
      header:null,
    },
  },
  configurations: {
    screen: ConfigurationStack,
    navigationOptions:{
      header:null,
    },
  }
});

export default HomeStack;