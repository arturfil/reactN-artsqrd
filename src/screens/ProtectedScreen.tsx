import React, { useContext } from 'react'
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { buttonColor } from '../theme/LoginTheme';

const ProtectedScreen = () => {

  const { user, token, logOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={buttonColor} />
      <Text style={styles.title}>Protected</Text>
      <Button onPress={logOut} title="Logout" color="#5856D6" />
      <Text>
        {user?.nombre}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  }
})

export default ProtectedScreen
