import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native'
import React, { useEffect } from 'react';
import AppAvatar from '../../assets/img/AnD_logo.png'
//colors
import { colors } from '../constants/color'


const LaunchScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate('Login'),3000)
  },[])

  return (
    <View style={styles.container}>
      <Image
        source={AppAvatar}
        style={styles.appLogo}
      />
      <Text style={styles.appTxt}>AnD Music</Text>
      <ActivityIndicator size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appLogo: {
    height: 150,
    width: 150,
    borderRadius: 30
  },
  appTxt: {
    fontSize: 47,
    fontWeight: 'bold',
    color: colors.emphasis
  }
})

export default LaunchScreen;