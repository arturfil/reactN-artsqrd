import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Background } from '../components/Background'
import GreenButton from '../components/GreenButton'
import WhiteLogo from '../components/WhiteLogo'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { buttonColor, loginStyles, selectColor } from '../theme/LoginTheme'

interface Props extends StackScreenProps<any, any> { }

const RegisterScreen = ({ navigation }: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);
  const { fullname, email, password, onChange } = useForm({
    fullname: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert("Register wasn't successful", errorMessage, [{
      text: 'Ok',
      onPress: removeError
    }])
  })

  const onRegister = () => {
    console.log({email, password, fullname});
    signUp({correo: email, password, nombre: fullname});
    Keyboard.dismiss()
  }

  return (
    <>
      <Background />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>

        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Register</Text>
          <Text style={loginStyles.label}>fullname: </Text>
          <TextInput
            onSubmitEditing={onRegister}
            onChangeText={(value) => onChange(value, 'fullname')}
            value={fullname}
            style={loginStyles.inputField}
            placeholderTextColor={selectColor}
            selectionColor={selectColor}
            placeholder="Enter Name"
            autoCapitalize="words"
            autoCorrect={false}
          />
          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            onSubmitEditing={onRegister}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            style={loginStyles.inputField}
            placeholderTextColor={selectColor}
            selectionColor={selectColor}
            placeholder="Enter Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={loginStyles.label}>Password: </Text>
          <TextInput
            onSubmitEditing={onRegister}
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => onChange(value, 'password')}
            style={loginStyles.inputField}
            placeholderTextColor={selectColor}
            selectionColor={selectColor}
            placeholder="Enter Password"
          />
          <GreenButton
            func={onRegister}
            title="Register"
          />
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity 
              onPress={() => navigation.replace('LoginScreen')}
              activeOpacity={0.8} 
            >
              <Text style={loginStyles.link}>
                Already Have an account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default RegisterScreen
