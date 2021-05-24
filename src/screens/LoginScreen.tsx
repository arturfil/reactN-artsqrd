import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Alert, Button, Keyboard, KeyboardAvoidingView, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Background } from '../components/Background'
import GreenButton from '../components/GreenButton'
import WhiteLogo from '../components/WhiteLogo'
import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { loginStyles, selectColor } from '../theme/LoginTheme'

interface Props extends StackScreenProps<any, any> { }

const LoginScreen = ({ navigation }: Props) => {
  const { signIn, errorMessage, removeError } = useContext(AuthContext);
  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert('Unsuccesful Login', errorMessage, [{text: 'Ok', onPress: removeError}]);
  }, [errorMessage])

  const onLogin = () => {
    console.log({ email, password });
    signIn({ correo: email, password });
    Keyboard.dismiss()
  }

  return (
    <>
      <Background />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}>

        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            onSubmitEditing={onLogin}
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
            onSubmitEditing={onLogin}
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => onChange(value, 'password')}
            style={loginStyles.inputField}
            placeholderTextColor={selectColor}
            selectionColor={selectColor}
            placeholder="Enter Password"
          />
          <GreenButton
            func={onLogin}
            title="Login"
          />
          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              onPress={() => navigation.replace('RegisterScreen')}
              activeOpacity={0.8}
            >
              <Text style={loginStyles.link}>
                Crear nueva cuenta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}

export default LoginScreen

