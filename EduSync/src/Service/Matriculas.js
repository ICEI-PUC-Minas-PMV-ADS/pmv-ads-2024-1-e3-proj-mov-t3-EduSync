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

// Função para obter as mensagens do usuário logado
export const getMatriculasTurma = async (idTurma) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}/Matricula/GetMatriculasTurma/${idTurma}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };


export const registerMatricula = async (matriculaData) => {
    const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post(`${BASE_URL}/Matricula`, matriculaData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
};

export const updateMatricula = async (id, matriculaData) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.put(`${BASE_URL}/Matricula/${id}`, matriculaData, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const getMatriculaById = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}/Matricula/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
};

export const deleteMatricula = async (id) => {

    const token = await AsyncStorage.getItem('userToken');
    await axios.delete(`${BASE_URL}/Matricula/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });   
};

export const getFilhosResponsavel = async (idResp) => {
    const response = await axios.get(`${BASE_URL}/Matricula/GetFilhosResponsavel/${idResp}`);
      return response.data;
};
