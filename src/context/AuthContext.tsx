import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import coffeeApi from "../api/Api";
import { LoginPayload, LoginResponse, RegisterPayload, User } from "../interfaces/AppInterfaces";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: User | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signUp: (registerPayload: RegisterPayload) => void;
  signIn: (loginPayload: LoginPayload) => void;
  logOut: () => void;
  removeError: () => void;
}

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState)

  useEffect(() => {
    checkToken();
  }, [])

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return dispatch({ type: 'notAuthenticated' });
    // checar si hay token
    const response = await coffeeApi.get('/auth');
    if (response.status !== 200) {
      return dispatch({ type: 'notAuthenticated' });
    }
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signUp', payload: { token: response.data.token, user: response.data.usuario } })
  }

  const signUp = async ({correo, password, nombre}: RegisterPayload) => {
    try {
      const {data} = await coffeeApi.post<LoginResponse>('/usuarios', {correo, password, nombre});
      dispatch({type: 'signUp', payload: {token: data.token, user: data.usuario}});
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({type: 'addError', payload: error.response.data.errors[0].msg || 'Wrong input field values'});
    }
  };

  const signIn = async ({ correo, password }: LoginPayload) => {
    try {
      const { data } = await coffeeApi.post<LoginResponse>('/auth/login', { correo, password });
      dispatch({ type: 'signUp', payload: { token: data.token, user: data.usuario } })
      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({ type: 'addError', payload: error.response.data.msg || 'Check input fields' })
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'logout' });
  };

  const removeError = async () => {
    dispatch({ type: 'removeError' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      signUp,
      signIn,
      logOut,
      removeError,
    }}>
      {children}
    </AuthContext.Provider>
  )
}