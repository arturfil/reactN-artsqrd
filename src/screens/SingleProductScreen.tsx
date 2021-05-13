import { Picker } from '@react-native-picker/picker'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import GreenButton from '../components/GreenButton'
import { ProductsContext } from '../context/ProductsContext'
import useCategories from '../hooks/useCategories'
import { useForm } from '../hooks/useForm'
import { ProductStackParams } from '../navigator/ProductsNavigator'
import { formColor, loginStyles, selectColor } from '../theme/LoginTheme'

interface Props extends StackScreenProps<ProductStackParams, 'SingleProductScreen'> { }

const SingleProductScreen = ({ navigation, route }: Props) => {
  const { name = '', id = '' } = route.params;
  const { categories } = useCategories();
  const { loadProductById } = useContext(ProductsContext)
  const { _id, nombre, setFormValue, categoriaId, img, form, onChange } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  })
  let isMounted = true;
  
  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'New Product'
    })
  }, [name])

  useEffect(() => {
    if (isMounted) 
      loadProduct();
  }, [])
  


  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    // while(product == null);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre
    })    
  }

  const saveOrUpdate = () => {
    if (id.length > 0) {
      console.log('update');
    } else {
      console.log('create');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
          placeholder="New Product"
          placeholderTextColor={selectColor}
          style={styles.textInput}
        />
        <Picker
          selectedValue={categoriaId}
          onValueChange={value => onChange(value, 'categoriaId')
          }
        >
          {
            categories && categories.map(category => (
              <Picker.Item label={category.nombre} value={category._id} key={category._id} />
            ))
          }

        </Picker>
        { 
          (img.length) > 0 && (
            <Image source={{uri: img}} style={{width: '100%', height: 200}}/>
          )
        }
        <Text>{JSON.stringify(form, null, 5)}</Text>
        <View style={{marginBottom: 25}}>
          <GreenButton

            func={saveOrUpdate}
            title="Save Product" />
          { id.length > 0 && (
            <>
              <GreenButton
                func={() => console.log("Camera")}
                title="Camara" />
              <GreenButton
                func={() => console.log("Gallery")}
                title="Gallery" />
            </>
          )

          }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20
  },
  productText: {
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize: 19,
    color: 'black'
  },
  textInput: {
    borderRadius: 2,
    color: formColor,
    borderColor: formColor,
    fontSize: 15,
    paddingHorizontal: 10,
    height: 50,
    margin: 12,
    borderWidth: 1
  }
})

export default SingleProductScreen
