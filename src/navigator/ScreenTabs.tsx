import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProtectedScreen from '../screens/ProtectedScreen';
import ProductsNavigator from './ProductsNavigator';
import { selectColor } from '../theme/LoginTheme';
import { tabHeight } from '../theme/Constants';

const Tab = createBottomTabNavigator();

const ScreenTabs = () => {

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      tabBarOptions={{
        activeTintColor: selectColor,
        labelStyle: {
          marginBottom: 10
        },
        showLabel: false,
        style: {
          position: 'absolute',
          height: tabHeight,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: 'white'
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={ProductsNavigator}
        options={{
          tabBarLabel: "Piezas",

          tabBarIcon: ({ color }) => <Icon name="home" color={color} size={30} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProtectedScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color }) => <Icon name="person" color={color} size={30} />
        }}
      />
    </Tab.Navigator>
  )
}

export default ScreenTabs;