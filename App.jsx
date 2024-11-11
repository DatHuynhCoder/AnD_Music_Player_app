import './gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LaunchScreen from './src/pages/LaunchScreen';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import MainBottom from './src/pages/MainBottom';

import { AudioProvider } from './src/context/AudioProvider';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AudioProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='LaunchScreen'
        >
          <Stack.Screen
            name='LaunchScreen'
            component={LaunchScreen}
          />
          <Stack.Screen 
            name='Login'
            component={Login}
          />
          <Stack.Screen 
            name='Signup'
            component={Signup}
          />
          <Stack.Screen 
            name='MainBottom'
            component={MainBottom}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AudioProvider>
  );
}

export default App;