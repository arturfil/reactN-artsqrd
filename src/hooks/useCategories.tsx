import { useEffect, useState } from "react"
import coffeeApi from "../api/Api";
import { CategoriesResponse, Category } from "../interfaces/AppInterfaces";


export const useCategories = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, [])

  const getCategories = async () => {
    const resp = await coffeeApi.get<CategoriesResponse>('/categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  }

  return {
    isLoading,
    categories
  }
}