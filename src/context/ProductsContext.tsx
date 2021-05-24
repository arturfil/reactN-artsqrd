import React, { createContext, useEffect, useState } from  'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import coffeeApi from '../api/Api';
import { Product, ProductsResponse } from '../interfaces/Products';

type ProductsContextProps = {
  products: Product[];
  returnLoadState: () => Promise<boolean>;
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Product>;
  updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Product>;
  uploadImage: (data: any, id: string) => Promise<void>; // change return type
}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadProducts();
  }, [])

  const returnLoadState = async () => {
    isLoading ? setIsLoading(false) : setIsLoading(true);
    const loader = await isLoading;
    return loader;
  }

  const loadProducts = async () => {
    const response = await coffeeApi.get<ProductsResponse>('/productos?limite=12');
    // setProducts([...products, ...response.data.productos]);
    setProducts([...response.data.productos]);
  };

  const addProduct = async (categoryId: string, productName: string): Promise<Product> => {
    const response = await coffeeApi.post<Product>('/productos', {
      nombre: productName,
      categoria: categoryId
    });
    setProducts([...products, response.data])
    return response.data;
  };

  const updateProduct = async (categoryId: string, productName: string, productId: string) => {
    const response = await coffeeApi.put<Product>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categoryId
    })
    setProducts(products.map(product => 
      product._id === productId ? response.data : product
    ));
  };
  
  const deleteProduct = async (id: string): Promise<void> => {
    const response = await coffeeApi.delete<Product>(`productos/${id}`);
  };
  
  const loadProductById = async (id: string): Promise<Product> => {
    const response = await coffeeApi.get<Product>(`/productos/${id}`)
    return response.data;
  }

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    setIsLoading(true);
    const fileToUpload = {
      uri: data.uri, 
      type: data.type,
      name: data.fileName
    }
    const formData = new FormData();
    formData.append('archivo', fileToUpload);
    try {
      const response = await coffeeApi.put<Product>(`/uploads/productos/${id}`, formData);
      console.log(response);
    } catch (error) {
      console.log({error});
    }
    setIsLoading(false);
  };
  
  return (
    <ProductsContext.Provider value={{
      products,
      returnLoadState,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      loadProductById,
      uploadImage
    }}>
      {children}
    </ProductsContext.Provider>
  )
}