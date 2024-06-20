import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://edusync20240424230659.azurewebsites.net/api';

// Função para obter os dados de uma turma específica
export const getAtividades= async () => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await axios.get(`${BASE_URL}/Atividades`, {
    headers: { Authorization: `Bearer ${token}` },
  }); 
  return response.data;
};


// Função para obter os dados de uma turma específica
export const getAtividadeById = async (id) => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await axios.get(`${BASE_URL}/Atividades/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  }); 
  return response.data;
};

// Função para atualizar os dados de uma turma
export const updateAtividade = async (id, atividadeData) => {
  const token = await AsyncStorage.getItem('userToken');
  await axios.put(`${BASE_URL}/Atividades/${id}`, atividadeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteAtividade = async (id) => {
  const token = await AsyncStorage.getItem('userToken'); // Obtém o token armazenado
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }

      await axios.delete(`${BASE_URL}/Atividades/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
};
