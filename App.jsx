import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getHeaderTitle } from '@react-navigation/elements';
import LaunchScreen from './src/pages/LaunchScreen';
import Login from './src/pages/Login';
import LoginAccount from './src/pages/LoginAccount';
import Signup from './src/pages/Signup';
import MainBottom from './src/pages/MainBottom';
import FloatingPlayer from './src/components/FloatingPlayer';
import PlayerPage from './src/pages/PlayerPage';
import NewAudioPlay from './src/pages/NewAudioPlay'

import { NewAudioContextProvider } from './src/context/NewAudioContextProvider';
import { UserContextProvider } from './src/context/UserContext';

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  return (
    <UserContextProvider>
      <NewAudioContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='LaunchScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='LaunchScreen' component={LaunchScreen} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='LoginAccount' component={LoginAccount} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='MainBottom' component={MainBottom} />
            <Stack.Screen name='FloatingPlayer' component={FloatingPlayer} />
            <Stack.Screen name='PlayerPage' component={PlayerPage}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen name='NewAudioPlay' component={NewAudioPlay} options={{headerShown: false}}/> */}
          </Stack.Navigator>
        </NavigationContainer>
      </NewAudioContextProvider>
    </UserContextProvider>
  );
}

export default App;