import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ProductsContext } from '../context/ProductsContext'
import { ProductStackParams } from '../navigator/ProductsNavigator'
import { buttonColor } from '../theme/LoginTheme'

const cols = 2;
const WIDTH = Dimensions.get('window').width;
interface Props extends StackScreenProps<ProductStackParams, 'ProductsScreen'> { };

const ProductsScreen = ({ navigation }: Props) => {
  const { products } = useContext(ProductsContext);
  // create a pull to refresh

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('SingleProductScreen', {})}
          activeOpacity={0.8}
        >
          <Text style={{marginRight: 20}}>Agregar</Text>
        </TouchableOpacity>
      )
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={buttonColor} />
      <FlatList
        numColumns={cols}
        data={products}
        keyExtractor={(p) => p._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('SingleProductScreen', {
              id: item._id,
              name: item.nombre
            })}
            activeOpacity={0.8}>
            <Text style={styles.productName}>
              {item.nombre}
            </Text>
            {/* Try to get the single image here */}
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  productName: {
    padding: 12,
    backgroundColor: '#8efacd',
    textAlign: 'justify',
    margin: 6,
    fontSize: 20,
    fontWeight: 'bold',
    borderColor: '#8efacd',
    borderWidth: 2,
    height: (WIDTH / cols) - 8,
    width: (WIDTH / cols) - 16,
    borderRadius: 12,
    justifyContent: 'center',
  },
})

export default ProductsScreen
