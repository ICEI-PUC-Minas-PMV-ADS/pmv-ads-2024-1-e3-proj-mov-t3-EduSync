// src/Service/MuralService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://edusync20240424230659.azurewebsites.net/api';


export const lancarAvaliacao = async (avaliacaoData) => {
  const token = await AsyncStorage.getItem('userToken');
  await axios.post(`${BASE_URL}/Mural`, avaliacaoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
