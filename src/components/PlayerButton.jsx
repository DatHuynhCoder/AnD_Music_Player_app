import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { misc_colors } from '../constants/color';

const PlayerButton = (props) => {
  const {onPress, iconType, size = 40, color = misc_colors.FONT, otherProps} = props
  const getIconName = (type) => {
    switch(type) {
      case 'PLAY':
        return 'pausecircle'
      case 'PAUSE':
        return 'playcircleo'
      case 'NEXT':
        return 'forward'
      case 'PREVIOUS':
        return 'banckward'
    }
  }
  return (
    <AntDesign 
      {...props}
      onPress={() => onPress()}
      name={getIconName(iconType)} 
      size={size} 
      color={color}
    />
  )
}

const styles = StyleSheet.create({

})

export default PlayerButton