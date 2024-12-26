import { StatusBar } from 'react-native';
import React, {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from './HomePage';
import ExplorePage from './ExplorePage';
import Library from './Library';
// import Player from './Player';
import NewAudioPlay from './NewAudioPlay'
//contanst
import { colors } from '../constants/color'
//icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import FloatingPlayer from '../components/FloatingPlayer';
import { Text, View } from 'react-native';
import { AudioContext } from '../context/NewAudioContextProvider';

const Tab = createBottomTabNavigator();

const MainBottom = () => {
  const { currentList } = useContext(AudioContext)
  return (
    <>
    <StatusBar/>
    {
      currentList.length > 0
      ?
      <FloatingPlayer/>
      :
      <></>
    }
    
    <Tab.Navigator
      initialRouteName='HomePage'
      screenOptions={({ route }) => (
        {
          headerShown: false,
          tabBarActiveTintColor: colors.emphasis,
          tabBarInactiveTintColor: 'white',
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            // backgroundColor: colors.background,
            borderTopWidth: 0, // Removes any border on top
            position: 'absolute',
            // marginVertical: 20,
            marginHorizontal: 30,
            backgroundColor: 'grey',
            borderRadius: 20,
            paddingHorizontal: 10,
            backgroundColor: 'rgba(66, 66, 66, 0.8)',
            height: 65,
            // justifyContent: 'center',
            // alignItems: 'center',
            paddingTop: 5
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
        name='NewAudioPlay'
        component={NewAudioPlay}
        options={{
          title: 'List',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
    </>
  )
}

export default MainBottom