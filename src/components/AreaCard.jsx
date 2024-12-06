import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import React from 'react';
import { colors } from '../constants/color';
import { textSizes } from '../constants/demensions';

const AreaCard = ({ areaName, areaURL, musicType }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}> {/* Wrapper with borderRadius and overflow */}
        <ImageBackground
          source={areaURL}
          style={styles.ImgBackground}
        >
          <Text style={styles.musicTypeTxt}>{musicType}</Text>
          <Text style={styles.areaNameTxt}>{areaName}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    overflow: 'hidden',
    height: 50,
    width: '48%'
  },
  imageContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden', 
  },
  ImgBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicTypeTxt: {
    fontSize: textSizes.xm,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  areaNameTxt: {
    fontSize: textSizes.xxm,
    color: colors.textPrimary,
    fontWeight: '600',
  }
});

export default AreaCard;
