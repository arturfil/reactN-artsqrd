import React, { useEffect, useState } from 'react'
import coffeeApi from '../api/Api';
import { CategoriesResponse, Category } from '../interfaces/AppInterfaces';

const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>();
  
  useEffect(() => {
    getCategories();
  }) 
  
  const getCategories = async () => {
    const response = await coffeeApi.get<CategoriesResponse>('/categorias');
    setCategories(response.data.categorias);
    setIsLoading(false);
  }

  return {categories, isLoading};
}

export default useCategories
