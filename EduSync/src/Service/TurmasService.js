import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://edusync20240424230659.azurewebsites.net/api';


export const getTurmas= async () => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await axios.get(`${BASE_URL}/Turmas`, {
    headers: { Authorization: `Bearer ${token}` },
  }); 
  return response.data;
};

// Função para obter a lista de professores
export const getProfessores = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await axios.get(`${BASE_URL}/Usuarios/professores`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getTurmaProfessor = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}/Turmas/getTurmasProfessor/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

// Função para obter os dados de uma turma específica
export const getTurmaById = async (id) => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await axios.get(`${BASE_URL}/Turmas/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  }); 
  return response.data;
};

// Função para atualizar os dados de uma turma
export const updateTurma = async (id, turmaData) => {
  const token = await AsyncStorage.getItem('userToken');
  await axios.put(`${BASE_URL}/Turmas/${id}`, turmaData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


export const deleteTurma = async (id) => {
  const token = await AsyncStorage.getItem('userToken'); // Obtém o token armazenado
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }
      await axios.delete(`${BASE_URL}/Turmas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
};
