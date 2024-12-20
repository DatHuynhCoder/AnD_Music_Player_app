import { View, Text } from 'react-native'
import React from 'react'
import FloatingPlayer from '../components/FloatingPlayer';
import { createStackNavigator } from '@react-navigation/stack';
import PlayerPage from './PlayerPage';
import AlbumCard from '../components/AlbumCard';
import NewAudioPlay from '../pages/NewAudioPlay'
const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName='PlayerPage' screenOptions={{headerShown: false}}>
      <Stack.Screen name='FloatingPlayer' component={FloatingPlayer}/>
      <Stack.Screen name='PlayerPage' component={PlayerPage} options={{headerShown: false}}/>
      <Stack.Screen name='AlbumCard' component={AlbumCard} options={{headerShown: false}}/>
      <Stack.Screen name='NewAudioPlay' component={NewAudioPlay} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default StackNav