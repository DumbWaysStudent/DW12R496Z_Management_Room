import React, { Component } from 'react';
import { Icon } from 'native-base'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Checkin from './../screens/Checkin'
import Room from './../screens/Room'
import Customers from './../screens/Customers'
import Settings from './../screens/Settings'

const buttomTabNavigator =  createBottomTabNavigator({ 

    Checkin: { screen: Checkin },
    Room: { screen: Room },
    Customers:{ screen: Customers },
    Settings:{ screen: Settings },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName,iconColor;
        if (routeName === 'Checkin') {
            iconName = `md-checkmark-circle${focused ? '' : ''}`;
        } else if (routeName === 'Room') {
            iconName = `md-bed${focused ? '' : ''}`;
        }else if (routeName === 'Customers') {
            iconName = `person${focused ? '' : ''}`;
        }else if (routeName === 'Settings') {
            iconName = `ios-settings${focused ? '' : ''}`;
        }
          
          return <Icon name={iconName} size={25} style={{fontSize: 30, color: 'blue' }}/>;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
  });
  
export default createAppContainer(buttomTabNavigator);