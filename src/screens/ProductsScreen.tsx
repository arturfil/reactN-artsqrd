import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import { ProductsContext } from '../context/ProductsContext'
import { ProductStackParams } from '../navigator/ProductsNavigator'
import { tabHeight } from '../theme/Constants'
import { buttonColor, selectColor } from '../theme/LoginTheme'

const cols = 2;
const WIDTH = Dimensions.get('window').width;
interface Props extends StackScreenProps<ProductStackParams, 'ProductsScreen'> { };

const ProductsScreen = ({ navigation }: Props) => {
  const { products, loadProducts } = useContext(ProductsContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('SingleProductScreen', {})}
          activeOpacity={0.8}
        >
          {/* <Text style={{ marginRight: 20 }}>Agregar</Text> */}
          <Icon style={{marginRight: 20}} name="add-circle" color={selectColor} size={30} />
        </TouchableOpacity>
      )
    })
  }, [])

  const loadProductsFromBackend = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={buttonColor} />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={cols}
        data={products}
        keyExtractor={(p) => p._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productConatiner}
            onPress={() => navigation.navigate('SingleProductScreen', {
              id: item._id,
              name: item.nombre
            })}
            activeOpacity={0.8}>
            <Image source={{ uri: item.img }} style={{ width: '100%', height: 100 }} />
            <Text style={styles.productName} >
              {item.nombre}
            </Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadProductsFromBackend}
          />
        }
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
    marginBottom: tabHeight,
  },
  productConatiner: {
    padding: 12,
    textAlign: 'left',
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
  productName: {
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
  },
})

export default ProductsScreen
