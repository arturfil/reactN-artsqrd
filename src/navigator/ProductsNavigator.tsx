import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ProductsScreen from '../screens/ProductsScreen';
import SingleProductScreen from '../screens/SingleProductScreen';

export type ProductStackParams = {
  ProductsScreen: undefined;
  SingleProductScreen: { id?: string, name?: string }
}

const Stack = createStackNavigator<ProductStackParams>();

const ProductsNavigator = (stack: ProductStackParams) => {
  
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent'
        }
      }}
    >
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsScreen}
        options={{ title: 'Products', headerTitleAlign: 'center'}} />
      <Stack.Screen
        options={{headerTitleAlign: 'center'}}
        name="SingleProductScreen"
        component={SingleProductScreen} />
    </Stack.Navigator>
  )
}

export default ProductsNavigator
