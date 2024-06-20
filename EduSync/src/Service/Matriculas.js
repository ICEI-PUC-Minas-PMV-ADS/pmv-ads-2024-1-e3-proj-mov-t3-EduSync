import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'https://edusync20240424230659.azurewebsites.net/api';


export const getMatriculas= async () => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}/Matricula`, {
      headers: { Authorization: `Bearer ${token}` },
    }); 
    return response.data;
};

export const registerMatricula = async (matriculaData) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}/Matricula`, matriculaData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateMatricula = async (id, matriculaData) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.put(`${BASE_URL}/Matricula/${id}`, matriculaData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMatriculaById = async (id) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}/Matricula/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteMatricula = async (id) => {
    const token = await AsyncStorage.getItem('userToken'); // Obtém o token armazenado
        if (!token) {
          Alert.alert('Erro', 'Token de autenticação não encontrado.');
          return;
        }
        await axios.delete(`${BASE_URL}/Matricula/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  };
