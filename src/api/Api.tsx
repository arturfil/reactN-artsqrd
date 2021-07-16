import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const baseURL = 'http:avgallerie.com/api' 
const baseURL = 'https://products-backen.herokuapp.com/api';

const coffeeApi = axios.create({baseURL});

coffeeApi.interceptors.request.use(
  async(config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  }
)

export default coffeeApi;