// play audio
export const play = async (playbackObj, uri) => {
  try {
    const status = await playbackObj.loadAsync(
      {uri: uri},
      {shouldPlay: true}
    )
    return status
  }
  catch(error) {
    console.log('error inside play helper method: ', error.message)
  }
}

// pause audio

export const pause = async (playbackObj) => {
  try {
    const status = await playbackObj.setStatusAsync({shouldPlay: false})
    return status
  }
  catch(error) {
    console.log('error inside pause helper method: ', error.message)
  }
}

// resume audio
export const resume = async (playbackObj) => {
  try {
    const status = await playbackObj.playAsync()
    return status
  }
  catch(error) {
    console.log('error inside resume helper method: ', error.message)
  }
}
// select another audio

export const playNext = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync()
    await playbackObj.unloadAsync()
    const status = await play(playbackObj, uri)
    return status
  } catch(error) {
    console.log('error inside playNext helper method: ', error.message)
  }
}