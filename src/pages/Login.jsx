import { View, Text, Button } from 'react-native'
import React from 'react'

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        onPress={() => navigation.navigate('Signup')}
        title='To Sign up'
      />
      <Button
        onPress={() => navigation.navigate('MainBottom')}
        title='To Home page'
      />
    </View>
  )
}

export default Login;