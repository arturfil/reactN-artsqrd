import React from 'react'
import { StatusBar, View } from 'react-native'
import { buttonColor } from '../theme/LoginTheme'

export const Background = () => {
  const backColor = 'white'
  // const backColor = 'white'


  return (
    <View style={{
      position: 'absolute',
      backgroundColor: backColor,
      // top: -256,
      width: '100%',
      height: '100%',
      // transform: [{ rotate: '-70deg' }]
    }}>
      <StatusBar backgroundColor={buttonColor}/>
    </View>
  )
}
