import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { loginStyles } from '../theme/LoginTheme'

interface Props {
  title: string
  func: Function
}

const GreenButton = ({title, func}: Props) => {
  return (
    <View style={loginStyles.bottomContainer}>
      <TouchableOpacity 
        onPress={() => func()}
        style={loginStyles.button}>
        <Text style={loginStyles.bottomText}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GreenButton
