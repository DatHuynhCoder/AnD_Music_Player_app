import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import React, { useState, useContext } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AppAvatar from '../../assets/img/AnD_logo.png'
//colors
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions'
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ipAddress } from '../constants/ipAddress';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const LoginAccount = ({ navigation }) => {
  const [isShow, setIsShow] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');

  const {userid, setUserid, setUsername,setUseravatar} = useContext(UserContext);

  const handleLogin = () => {
    if (email === '' || pass === '') {
      Toast.show({
        type:'error',
        text1: 'Please fill in all the required information!'
      })
    }
    else {
      const info = {
        email: email,
        pass : pass
      }

      const loginUser = async () => {
        try {
          const response = await axios.post("http://" + ipAddress + ":3177" + "/login", info);
          if (response.data.Status === 'Success') {
            setUserid(response.data.userid);
            setUsername(response.data.username);
            setUseravatar(response.data.useravatar);
            navigation.navigate('MainBottom');
            Toast.show({
              type: 'success',
              text1: 'Login successfully!',
              text2: 'Hope you have a great time listening to our music 🎵'
            });
          }
          else {
            Toast.show({
              type: 'error',
              text1: 'Error ❌'
            })
          }
        } catch (error) {
          console.log('Loi trong qua trinh dang nhap tai khoan')
        }
      }

      loginUser();
    }
  }

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
          keyboardType='email-address'
          placeholderTextColor={colors.textPrimary}
          onChangeText={setEmail}
          style={styles.email}>
        </TextInput>
      </View>
      <View style={styles.googleLogin}>
        <AntDesign name="lock1" size={24} color="#3b3a3a" />
        <TextInput
          placeholder='Password'
          placeholderTextColor={colors.textPrimary}
          onChangeText={setPassword}
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
        textStyle={{ fontSize: textSizes.xxm, fontWeight: 'bold' }}
        onPress={() => { setIsChecked(isChecked => !isChecked) }}
        style={{ width: 330, padding: 15 }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.1}
        style={{ marginTop: 10, marginBottom: 15 }}
      >
        <View style={styles.btn}>
          <Text style={{ color: colors.textPrimary }}>Log in</Text>
        </View>
      </TouchableOpacity>
      <Text style={{ color: colors.emphasis }}>Forgot the password?</Text>
      <Text style={styles.or}>
        ___________ or continue with ___________
      </Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 150, marginBottom: 20 }}>
        <AntDesign name="google" size={34} color="red" style={{ padding: 3 }} />
        <FontAwesome5 name="facebook" size={34} color="blue" style={{ padding: 3 }} />
      </View>
      <Text style={{ color: colors.textPrimary }}>
        Don't have an account? &nbsp;
        <Text
          onPress={() => {
            navigation.navigate('Signup')
          }}
          style={{ color: colors.emphasis }}
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
    height: 100,
    width: 100,
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
    height: 60,
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
    opacity: 0.3,
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
    height: 50,
    width: 330,
    borderWidth: 0,
    borderRadius: 50,
    shadowColor: colors.emphasis,
    shadowRadius: 5,
    elevation: 3,
  }
})
export default LoginAccount;