import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'https://edusync20240424230659.azurewebsites.net/api';

const ResponderMensagemScreen = () => {
  const route = useRoute();
  const { destinatarioId } = route.params;
  const [novaMensagem, setNovaMensagem] = useState('');
  const [allMensagens, setAllMensagens] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('Você');

  useEffect(() => {
    const fetchUserIdAndMessages = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const numericId = parseInt(id, 10); // Converte para número
        const nome = await AsyncStorage.getItem('userName');
        setUserName(nome || 'Você');
        setUserId(numericId);

        const token = await AsyncStorage.getItem('userToken');
        const responseMensagensUser = await axios.get(`${BASE_URL}/Mensagens/GetMensagensTrocadas/${numericId}/iddestinatario/${destinatarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const responseMensagensDestinatarioUser = await axios.get(`${BASE_URL}/Mensagens/GetMensagensTrocadas/${destinatarioId}/iddestinatario/${numericId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const combinedMessages = [
          ...responseMensagensUser.data,
          ...responseMensagensDestinatarioUser.data,
        ];

        setAllMensagens(combinedMessages.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as mensagens.');
      }
    };

    fetchUserIdAndMessages();
  }, [destinatarioId]);

  const handleSendMessage = async () => {
    try {
      if (!userId) {
        Alert.alert('Erro', 'ID do usuário não encontrado.');
        return;
      }

      const token = await AsyncStorage.getItem('userToken');
      await axios.post(`${BASE_URL}/Mensagens`, {
        mensagem: novaMensagem,
        destinatarioId: destinatarioId,
        remetenteId: userId,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNovaMensagem('');

     
      setAllMensagens(prevMensagens => [
        ...prevMensagens,
        {
          id: prevMensagens.length ? prevMensagens[prevMensagens.length - 1].id + 1 : 1, 
          mensagem: novaMensagem,
          destinatarioId: destinatarioId,
          remetenteId: userId,
          dtEnvio: new Date().toISOString(),
          remetente: { nome: userName }, 
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
    }
  };

  const renderItem = ({ item }) => {
    const isUserMessage = item.remetenteId === userId;
    return (
      <View style={[styles.messageItem, isUserMessage ? styles.userMessage : styles.destinatarioMessage]}>
        {isUserMessage && <Image source={require('../../assets/icon-responsavel.png')} style={styles.userIcon} />}
        <View style={styles.messageContent}>
          <Text style={styles.messageText}>{item.mensagem}</Text>
          <Text style={styles.messageDate}>{new Date(item.dtEnvio).toLocaleString()} - {item.remetente.nome}</Text>
        </View>
        {!isUserMessage && <Image source={require('../../assets/icon-responsavel.png')} style={styles.userIcon} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allMensagens}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={novaMensagem}
          onChangeText={setNovaMensagem}
          placeholder="Digite a mensagem..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  destinatarioMessage: {
    justifyContent: 'flex-start',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 16,
  },
  messageDate: {
    fontSize: 12,
    color: '#aaa',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
  },
});

export default ResponderMensagemScreen;
