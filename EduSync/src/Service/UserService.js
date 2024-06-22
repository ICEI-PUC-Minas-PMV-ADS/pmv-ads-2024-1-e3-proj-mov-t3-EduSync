import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://edusync20240424230659.azurewebsites.net/api';

const getToken = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return token;
};

export const getUser = async (id) => {
  const token = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter usuário:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  const token = await getToken();
  try {
    const response = await axios.put(`${BASE_URL}/usuarios/${id}`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  const token = await getToken();
  try {
    await axios.delete(`${BASE_URL}/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${BASE_URL}/usuarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    throw error;
  }
};
