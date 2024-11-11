import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import * as MediaLibrary from 'expo-media-library'

const Library = () => {
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync()
    console.log(permission);
  }

  useEffect(() => {
    getPermission()
  }, [])

  return (
    <View>
      <Text>Library</Text>
    </View>
  )
}

export default Library