import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://edusync20240424230659.azurewebsites.net/api';

export const login = async (login, senha) => {
  try {   

    const response = await axios.post(`${API_URL}/login`, {login,senha, });
    const userData = response.data;

    if (userData && userData.user && userData.user.id && userData.user.nome && userData.user.tipoPerfil && userData.token) {
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userId', userData.user.id.toString());
      await AsyncStorage.setItem('userPerfil', userData.user.tipoPerfil.toString());
      await AsyncStorage.setItem('userName', userData.user.nome);
    }
    return response.data;
  } catch (error) {

    if (error.response) {       
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {        
        console.error('Error request:', error.request);
      } else {
        // Algo aconteceu na configuração da requisição que acionou um erro
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
      throw error;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Failed to clear AsyncStorage:', error);
  }
};