import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const BASE_URL = 'https://edusync20240424230659.azurewebsites.net/api';

const NovaMensagemScreen = () => {
  const [destinatarioId, setDestinatarioId] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [tipoPerfil, setTipoPerfil] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserPerfil = async () => {
      const perfil = await AsyncStorage.getItem('userPerfil');
      setTipoPerfil(parseInt(perfil, 10));
    };

    fetchUserPerfil();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        let endpoint = '/Usuarios';
        if (tipoPerfil === 3) {
          endpoint = '/Usuarios/Professores';
        }

        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsuarios(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      }
    };

    if (tipoPerfil !== null) {
      fetchUsuarios();
    }
  }, [tipoPerfil]);

  const handleSendMessage = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      await axios.post(
        `${BASE_URL}/Mensagens`,
        {
          mensagem,
          destinatarioId,
          remetenteId: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert('Sucesso', 'Mensagem enviada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione o destinatário:</Text>
      <Picker
        selectedValue={destinatarioId}
        onValueChange={(itemValue) => setDestinatarioId(itemValue)}
        style={styles.picker}
      >
        {usuarios.map((usuario) => (
          <Picker.Item key={usuario.id} label={`${usuario.nome} ${usuario.sobreNome}`} value={usuario.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Mensagem:</Text>
      <TextInput
        style={styles.input}
        value={mensagem}
        onChangeText={setMensagem}
        placeholder="Digite sua mensagem..."
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#00aaff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NovaMensagemScreen;
