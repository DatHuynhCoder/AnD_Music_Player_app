//This is use in ExplorePage.jsx
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import React from 'react'

const AreaCard = ({areaName,areaColor,musicType}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground>
        <Text style={styles.musicType}>{musicType}</Text>
        <Text>{areaName}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})

export default AreaCard
