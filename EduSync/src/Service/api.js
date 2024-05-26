import axios from 'axios';

const API_URL = 'https://edusync20240424230659.azurewebsites.net/api';

export const login = async (login, senha) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
        login,
        senha,
    });
    return response.data;
  } catch (error) {

    if (error.response) {
        // A requisição foi feita e o servidor respondeu com um código de status
        // que está fora do range de 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        console.error('Error request:', error.request);
      } else {
        // Algo aconteceu na configuração da requisição que acionou um erro
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
      throw error;

    console.error('Error logging in:', error);
    throw error;
  }
};