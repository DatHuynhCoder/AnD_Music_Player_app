import { View, Text, Button,StyleSheet, Image, TouchableOpacity,TextInput } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AppAvatar from '../../assets/img/AnD_logo.png'
//colors
import { colors } from '../constants/color'
import {textSizes} from '../constants/demensions'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

const LoginAccount = ({ navigation }) => {
  const [isShow, setIsShow] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  return (
    <View style={styles.container}>
      <Image
        source={AppAvatar}
        style={styles.appLogo}
      />
      <Text style={styles.appTxt}>Login to your account</Text>
      <View style={styles.googleLogin}>
        <Fontisto name="email" size={24} color="#3b3a3a" />
        <TextInput 
          placeholder='Email' 
          placeholderTextColor={colors.textPrimary}
          style={styles.email}>
        </TextInput>
      </View>
      <View style={styles.googleLogin}>
        <AntDesign name="lock1" size={24} color="#3b3a3a" />
        <TextInput 
          placeholder='Password' 
          placeholderTextColor={colors.textPrimary}
          style={styles.password}
          secureTextEntry={isShow === false ? true : false}>
        </TextInput>
        <TouchableOpacity onPress={() => setIsShow(!isShow)}>
          {
            isShow === false ? (
              <Ionicons name="eye-off-outline" size={24} color="#3b3a3a" />
            ) : (
              <Ionicons name="eye-outline" size={24} color="#3b3a3a" />
            )
          }
        </TouchableOpacity>
      </View>
      <BouncyCheckbox
        size={20}
        fillColor={colors.emphasis}
        unFillColor={colors.background}
        text="Remember me"
        iconStyle={{ borderColor: colors.emphasis }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{fontSize: textSizes.xxm, fontWeight: 'bold'}}
        onPress={() => {setIsChecked(isChecked => !isChecked)}}
        style={{width: 330, padding: 15}}
      />
      <TouchableOpacity 
        onPress={() => {
          navigation.navigate('MainBottom')
        }}
        activeOpacity={0.1}
        style={{marginTop: 10, marginBottom: 15}}
      >
        <View style={styles.btn}>
          <Text style={{color: colors.textPrimary}}>Log in</Text>
        </View>
      </TouchableOpacity>
      <Text style={{color: colors.emphasis}}>Forgot the password?</Text>
      <Text style={styles.or}>
        ___________ or continue with ___________
      </Text>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 150, marginBottom: 20}}>
        <AntDesign name="google" size={34} color="red" style={{padding: 3}}/>
        <FontAwesome5 name="facebook" size={34} color="blue" style={{padding: 3}} />
      </View>
      <Text style={{color: colors.textPrimary}}>
        Don't have an account? &nbsp;
        <Text 
          onPress={() => {
            navigation.navigate('Signup')
          }}
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
    paddingTop: 100
  },
  appLogo: {
    height: 150,
    width: 150,
    borderRadius: 30,
    marginBottom: 50
  },
  appTxt: {
    fontSize: textSizes.xl,
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
  email: {
    color: colors.textPrimary,
    marginLeft: 10,
    width: 260,
    fontSize: textSizes.xm,
    opacity: 0.3
  },
  password: {
    color: colors.textPrimary,
    marginLeft: 10,
    width: 236,
    fontSize: textSizes.xm,
    opacity: 0.3
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
export default LoginAccount;