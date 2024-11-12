import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from './HomePage';
import ExplorePage from './ExplorePage';
import Library from './Library';
import AudioList from './AudioList';
//contanst
import {colors} from '../constants/color'
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainBottom = () => {
  return (
    <Tab.Navigator
      initialRouteName='HomePage'
      screenOptions={({ route }) => (
        {
          // headerShown: false,
          tabBarActiveTintColor: colors.emphasis,
          tabBarInactiveTintColor: 'white',
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: colors.background
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            switch (route.name) {
              case 'HomePage':
                iconName = focused ? 'home' : 'home-outline'
                break
              case 'ExplorePage':
                iconName = focused ? 'search' : 'search-outline'
                break
              default:
                iconName = focused ? 'folder' : 'folder-outline'
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        }
      )}
    >
      <Tab.Screen
        name='HomePage'
        component={HomePage}
        options={{
          title: 'Home'
        }}
      />
      <Tab.Screen
        name='ExplorePage'
        component={ExplorePage}
        options={{
          title: 'Explore'
        }}
      />
      <Tab.Screen
        name='Library'
        component={Library}
        options={{
          title: 'Library'
        }}
      />
      <Tab.Screen
        name='AudioList'
        component={AudioList}
        options={{
          title: 'AudioList',
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

export default MainBottom