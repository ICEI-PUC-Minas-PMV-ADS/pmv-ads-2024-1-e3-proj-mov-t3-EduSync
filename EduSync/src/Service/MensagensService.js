// MensagensService.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://edusync20240424230659.azurewebsites.net/api';

export const getMensagens = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const response = await axios.get(`${BASE_URL}/Mensagens`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


// Função para obter as mensagens do usuário logado
export const getMensagensUser = async (userId) => {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${BASE_URL}/Mensagens/GetMensagensUser/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  // Função para obter mensagens recebidas pelo usuário
export const getMensagensRecebidas = async (userId) => {
  const response = await axios.get(`${BASE_URL}/Mensagens/GetMensagensDestinatario/${userId}`);
  return response.data;
};

export const enviarMensagem = async (mensagemData) => {
  const token = await AsyncStorage.getItem('userToken');
  await axios.post(`${BASE_URL}/Mensagens`, mensagemData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const responderMensagem = async (id, respostaData) => {
  const token = await AsyncStorage.getItem('userToken');
  await axios.post(`${BASE_URL}/Mensagens/${id}/Responder`, respostaData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
