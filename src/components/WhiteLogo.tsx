import React from 'react'
import { Image, View } from 'react-native'
import { loginStyles } from '../theme/LoginTheme'

const WhiteLogo = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image 
        source={require('../assets/pallette_logo.png')} 
        style={loginStyles.logoSingUp}/>
    </View>
  )
}

export default WhiteLogo
