import { 
  View, 
  Text, 
  StyleSheet,
  Image
} from 'react-native'
import React from 'react'
//constants
import { colors } from '../constants/color'
import { iconSizes, textSizes } from '../constants/demensions'
//icons
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import UserAvatar from '../../assets/img/user_avatar.png'

const HomePage = () => {
  const tempUserData = {
    userName: 'Coichung2hondaicuamay'
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.welcomeUserContainer}>
          <Image 
            source={UserAvatar}
            style={styles.userAvatar}
          />

          <View style={styles.userContainer}>
            <Text style={styles.welcometxt}>Welcome Back !</Text>
            <Text style={styles.usertxt}>{tempUserData.userName}</Text>
          </View>
        </View>
        <View style={styles.userOptionsContainer}>
          <Ionicons
            name='stats-chart'
            color={colors.iconPrimary}
            size={iconSizes.md}
          />

          <MaterialCommunityIcons
            name='bell'
            color={colors.iconPrimary}
            size={iconSizes.md}
          />

          <Ionicons
            name='settings'
            color={colors.iconPrimary}
            size={iconSizes.md}
          />

        </View>
      </View>
      <Text style={{ color: 'white' }}>HomePage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    // backgroundColor: '#ccc',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  welcomeUserContainer: {
    flexDirection: 'row',
    gap: 10
  },
  userContainer:{
    flexDirection: 'column',
  },
  welcometxt: {
    color: colors.textPrimary,
    fontWeight: '600',
    fontSize: textSizes.xm
  },
  usertxt: {
    color: colors.textSecondary,
    fontSize: textSizes.xxm
  },
  userAvatar:{
    height: iconSizes.xl,
    width: iconSizes.xl,
    borderRadius: 24
  },
  userOptionsContainer: {
    flexDirection: 'row',
    gap: 10
  }
})

export default HomePage