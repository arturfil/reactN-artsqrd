import { StyleSheet } from "react-native";

// const formColor = '#8fffff';
// const formColor = '#22e6e2';
export const formColor = 'black';
export const buttonColor = '#8effa9'
export const selectColor = '#2acfaa'

export const loginStyles = StyleSheet.create({
  logoSingUp: {
    width: 110, 
    height: 110, 
    tintColor: buttonColor
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    height: 600,
    marginBottom: 50
  },
  title: {
    marginLeft: 12,
    color: formColor,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  label: {
    marginLeft: 12,
    marginTop: 10,
    color: formColor,
    fontWeight: 'bold',
  },
  inputField: {
    borderRadius: 2,
    color: formColor,
    borderColor: formColor,
    fontSize: 15,
    paddingHorizontal: 10,
    height: 50,
    margin: 12,
    borderWidth: 1
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  button: {
    width: '95%',
    paddingHorizontal: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: buttonColor,
    paddingVertical: 10,
    backgroundColor: buttonColor,
    height: 50,
    textAlignVertical: 'bottom'
  },
  bottomText: {
    fontSize: 16,
    color: 'black'
  },
  newUserContainer: {
    alignItems: 'flex-end',
    marginTop: 10
  },
  link: {
    color: formColor,
    marginRight: 10
  },
  buttonReturn: {
    position: 'absolute',
    top: 30,
    left: 30,
    borderWidth: 1,
    borderColor: formColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
  }
});