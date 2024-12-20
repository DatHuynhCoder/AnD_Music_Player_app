import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AppAvatar from '../../assets/img/AnD_logo.png'
import { ipAddress } from '../constants/ipAddress';

//colors
import { colors } from '../constants/color'
import { textSizes } from '../constants/demensions'
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

import axios from 'axios';

const isAllNumbers = (str) => {
  if (!str) return false;
  return /^\d+$/.test(str);
}

const SignUp = ({ navigation }) => {
  const [isShow, setIsShow] = useState(false)
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPassword] = useState('');
  const [confirmPass, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (username === '' || phone === '' || email === '' || pass === '' || confirmPass === '') {
      Alert.alert('Please fill in all the required information!');
    }
    else if (!isAllNumbers(phone)) {
      Alert.alert('The phone number must not contain non-numeric characters')
    }
    else if (pass !== confirmPass) {
      Alert.alert('Password and confirmation password must match')
    }
    else {
      const info = {
        username: username,
        phone: phone,
        email: email,
        pass: pass
      }

      const registerUser = async () => {
        try {
          const response = await axios.post("http://" + ipAddress + ":3177" + "/register", info);
          if (response.data.Status === 'Success') {
            Alert.alert("Account registration successful, please log in!");
            navigation.navigate('LoginAccount');
          }
          else {
            Alert.alert(response.data.Error);
          }
        } catch (error) {
          console.log('Loi trong qua trinh dang ky tai khoan')
        }
      }

      registerUser();
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={AppAvatar}
        style={styles.appLogo}
      />
      <Text style={styles.appTxt}>Enter your infomation</Text>
      <View style={styles.input_container}>
        <AntDesign name="user" size={24} color="#3b3a3a" />
        <TextInput
          placeholder='Username'
          placeholderTextColor={colors.textPrimary}
          onChangeText={setUsername}
          style={styles.input_text1}>
        </TextInput>
      </View>
      <View style={styles.input_container}>
        <Fontisto name="email" size={24} color="#3b3a3a" />
        <TextInput
          placeholder='Email'
          keyboardType='email-address'
          placeholderTextColor={colors.textPrimary}
          onChangeText={setEmail}
          style={styles.input_text1}>
        </TextInput>
      </View>
      <View style={styles.input_container}>
        <Fontisto name="email" size={24} color="#3b3a3a" />
        <TextInput
          placeholder='Phone'
          placeholderTextColor={colors.textPrimary}
          onChangeText={setPhone}
          style={styles.input_text1}>
        </TextInput>
      </View>
      <View style={styles.input_container}>
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
      <View style={styles.input_container}>
        <AntDesign name="lock1" size={24} color="#3b3a3a" />
        <TextInput
          placeholder=' Comfirm password'
          placeholderTextColor={colors.textPrimary}
          onChangeText={setConfirmPassword}
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
      <TouchableOpacity
        onPress={handleRegister}
        activeOpacity={0.1}
        style={{ marginTop: 10, marginBottom: 15 }}
      >
        <View style={styles.btn}>
          <Text style={{ color: colors.textPrimary }}>Register</Text>
        </View>
      </TouchableOpacity>

      <Text style={{ color: colors.textPrimary }}>
        Comeback to&nbsp;
        <Text
          onPress={() => {
            navigation.navigate('LoginAccount')
          }}
          style={{ color: colors.emphasis }}
        >
          Log in
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
    marginBottom: 25
  },
  appTxt: {
    fontSize: textSizes.xl,
    fontWeight: '1',
    color: colors.textPrimary,
    marginBottom: 25
  },
  input_container: {
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
  input_text1: {
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
export default SignUp;