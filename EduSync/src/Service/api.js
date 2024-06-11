import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://edusync20240424230659.azurewebsites.net/api';

export const login = async (login, senha) => {
  try {

    const response = await axios.post(`${API_URL}/login`, { login, senha, });
    const userData = response.data;

    if (userData && userData.user && userData.user.id && userData.user.nome && userData.user.tipoPerfil && userData.token && userData.user.sobreNome && userData.user.email) {
      await AsyncStorage.setItem('userToken', userData.token);
      await AsyncStorage.setItem('userId', userData.user.id.toString());
      await AsyncStorage.setItem('userPerfil', userData.user.tipoPerfil.toString());
      await AsyncStorage.setItem('sobreNome', userData.user.sobreNome);
      await AsyncStorage.setItem('email', userData.user.email);
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

//Função para pegar dados dos professores
export const fetchProfessores = async () => {
  try {
    const response = await axios.get(`${API_URL}/Usuarios/professores`);
    console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os professores:', error);
    throw error;
  }
}

//Função para cadastrar uma turma
export const cadastrarTurma = async (turma) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Turmas`, turma);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar a turma:', error);
    throw error;
  }
};


//Função para pegar dados dos professores
export const fetchDadosUsuario = async () => {
  try {
    const response = await axios.get(`${API_URL}/Usuarios/${userData.user.id}`);
    console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o usuario:', error);
    throw error;
  }
}
