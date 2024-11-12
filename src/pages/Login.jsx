import { View, Text, Button,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AppAvatar from '../../assets/img/AnD_logo.png'
//colors
import { colors } from '../constants/color'
import {textSizes} from '../constants/demensions'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={AppAvatar}
        style={styles.appLogo}
      />
      <Text style={styles.appTxt}>Let's get you in</Text>
      <View style={styles.googleLogin}>
        <AntDesign name="google" size={24} color="black" />
        <View>
          <Text style={styles.googleLoginText}>Continue with Google</Text>
        </View>
      </View>
      <View style={styles.googleLogin}>
        <FontAwesome5 name="facebook" size={24} color="black" />        
        <View>
          <Text style={styles.googleLoginText}>Continue with Facebook</Text>
        </View>
      </View>
      <Text style={styles.or}>
        ___________ or ___________
      </Text>
      <TouchableOpacity 
        onPress={() => navigation.navigate('LoginAccount')}
        activeOpacity={0.1}
        style={{marginTop: 30, marginBottom: 30}}
      >
        <View style={styles.btn}>
          <Text style={{color: colors.textPrimary}}>Log in with a password  
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{color: colors.textPrimary}}>
        Don't have an account? &nbsp;
        <Text 
          onPress={() => navigation.navigate('Signup')}
          style={{color: colors.emphasis}}
        >
          Sign up
        </Text>
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: 'center',
    paddingTop: 150
  },
  appLogo: {
    height: 150,
    width: 150,
    borderRadius: 30,
    marginBottom: 50
  },
  appTxt: {
    fontSize: 47,
    fontWeight: '1',
    color: colors.textPrimary,
    marginBottom: 50
  },
  googleLogin: {
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    width: 330,
    backgroundColor: '#242323',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#3b3a3a',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10
  },
  googleLoginText: {
    color: colors.textPrimary,
    marginLeft: 10
  },
  or: {
    color: colors.textPrimary,
    fontSize: textSizes.xm,
    marginTop: 20,
    marginBottom: 20
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height:50, 
    width: 330,
    borderWidth:0, 
    borderRadius:50,
    shadowColor: colors.emphasis,
    shadowRadius: 5,
    elevation: 3,
  }
})
export default Login;