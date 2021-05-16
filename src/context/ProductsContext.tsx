import React, { createContext, useEffect, useState } from  'react';
import coffeeApi from '../api/Api';
import { Product, ProductsResponse } from '../interfaces/Products';

type ProductsContextProps = {
  products: Product[];
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
  useEffect(() => {
    loadProducts();
  }, [])

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
  
  const deleteProduct = async (id: string) => {};
  
  const loadProductById = async (id: string): Promise<Product> => {
    const response = await coffeeApi.get<Product>(`/productos/${id}`)
    return response.data;
  }

  const uploadImage = async (data: any, id: string) => {};
  
  return (
    <ProductsContext.Provider value={{
      products,
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