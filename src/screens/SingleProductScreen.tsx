import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { StackScreenProps } from '@react-navigation/stack'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import GreenButton from '../components/GreenButton'
import { ProductsContext } from '../context/ProductsContext'
import {useCategories} from '../hooks/useCategories'
import { useForm } from '../hooks/useForm'
import { ProductStackParams } from '../navigator/ProductsNavigator'
import { formColor, loginStyles, selectColor } from '../theme/LoginTheme'

interface Props extends StackScreenProps<ProductStackParams, 'SingleProductScreen'> { }

const SingleProductScreen = ({ navigation, route }: Props) => {
  const win = Dimensions.get('window');
  const [tempUri, setTempUri] = useState<string>();
  const { id = '', name = '', } = route.params;
  const { categories } = useCategories();
  const { loadProductById, addProduct, updateProduct, uploadImage, deleteProduct } = useContext(ProductsContext)
  const { _id, nombre, categoriaId, img, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  })

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'New Product'
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, [categoriaId]);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre
    })
  }

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoryId = categoriaId || categories[0]._id
      const newProduct = await addProduct(tempCategoryId, nombre);
      onChange(newProduct._id, '_id');
    }
  }

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    }, response => {
      if (response.didCancel) return;
      if (!response.uri) return;
      setTempUri(response.uri);
      uploadImage(response, _id);
    });
  }

  const chooseFromGallery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    }, response => {
      if (response.didCancel) return;
      if (!response.uri) return;
      setTempUri(response.uri);
      uploadImage(response, _id);
    });
  }

  const removeProduct = () => {
    const productToDelete = deleteProduct(id);
    navigation.navigate('ProductsScreen');
    return productToDelete
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
          placeholder="Product Name"
          placeholderTextColor={selectColor}
          style={styles.textInput}
        />
        <Picker
          selectedValue={categoriaId}
          onValueChange={(value) => onChange(value, 'categoriaId')}
        >
          {
            categories.map(c => (
              <Picker.Item
                label={c.nombre}
                value={c._id}
                key={c._id}
              />
            ))
          }

        </Picker>
        {
          (img.length) > 0 && !tempUri && (
            <Image source={{ uri: img }} style={{ 
              flex: 1, width: win.width, height: win.height/4, alignItems: "stretch"
            }} />
          )
        }
        {
          tempUri && (
            <Image source={{ uri: tempUri}} style={{ width: '100%', height: 400 }} />
          )
        }
        {
          img.length < 0 && (
            <Text>Loading Image...</Text>
          )
        }
        
        <View style={{ marginBottom: 25 }}>
          <GreenButton
            func={saveOrUpdate}
            title="Save Product" />
          {_id.length > 0 && (
            <>
              <GreenButton
                func={takePhoto}
                title="Camara" />
              <GreenButton
                func={chooseFromGallery}
                title="Gallery" />
              <GreenButton
                func={removeProduct}
                title="Eliminate" />
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
    marginHorizontal: 20,
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

