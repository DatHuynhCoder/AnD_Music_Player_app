
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from './src/pages/LaunchScreen';
import Login from './src/pages/Login';
import LoginAccount from './src/pages/LoginAccount';
import Signup from './src/pages/Signup';
import MainBottom from './src/pages/MainBottom';

import { AudioProvider } from './src/context/AudioProvider';
import { NewAudioContextProvider } from './src/context/NewAudioContextProvider';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NewAudioContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LaunchScreen' screenOptions={{headerShown: false}}>
          <Stack.Screen name='LaunchScreen' component={LaunchScreen}/>
          <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
          <Stack.Screen name='LoginAccount' component={LoginAccount} options={{headerShown: false}}/>
          <Stack.Screen name='Signup' component={Signup}/>
          <Stack.Screen name='MainBottom' component={MainBottom}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NewAudioContextProvider>
  );
}

export default App;