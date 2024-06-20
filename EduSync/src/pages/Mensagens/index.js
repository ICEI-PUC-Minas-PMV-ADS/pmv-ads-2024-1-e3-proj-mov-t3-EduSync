import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMensagensUser,getMensagensRecebidas } from '../../Service/MensagensService';

const MensagensScreen = () => {
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMensagens = async () => {
      setLoading(true);
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          Alert.alert('Erro', 'ID do usuário não encontrado.');
          return;
        }
        //const data = await getMensagensUser(userId);
        const enviadas = await getMensagensUser(userId);
        const recebidas = await getMensagensRecebidas(userId);

        const todasMensagens = [...enviadas, ...recebidas];
        const groupedMensagens = groupByDestinatario(todasMensagens,userId);

        setMensagens(Object.entries(groupedMensagens));
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as mensagens.');
      } finally {
        setLoading(false);
      }
    };
    fetchMensagens();
  }, []);

  const groupByDestinatario = (mensagens,userId) => {
    
    return mensagens.reduce((grouped, mensagem) => {

      const destId = mensagem.destinatario.id;
       const remetId = mensagem.remetente.id;

    // Verifica se o destinatário ou o remetente é diferente do usuário logado
    if (destId !== userId && remetId !== userId) {
      if (!grouped[destId]) {
        grouped[destId] = [];
      }
      grouped[destId].push(mensagem);
    }
    console.log(grouped);
      return grouped;

    }, {});
  };

  const handleSelectDestinatario = (destinatarioId, mensagens) => {
    navigation.navigate('ResponderMensagem', { destinatarioId, mensagens });
  };

  const handleNewMessage = () => {
    navigation.navigate('EnviarMensagem'); // Navega para a tela de nova mensagem
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00aaff" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.newMessageButton} onPress={handleNewMessage}>
        <Text style={styles.newMessageButtonText}>Nova Mensagem</Text>
      </TouchableOpacity>
      <FlatList
        data={mensagens}
        keyExtractor={([destinatarioId]) => destinatarioId.toString()}
        renderItem={({ item: [destinatarioId, mensagens] }) => (
          <TouchableOpacity onPress={() => handleSelectDestinatario(destinatarioId, mensagens)}>
            <View style={styles.item}>
              <Text style={styles.name}>{mensagens[0].destinatario.nome} {mensagens[0].destinatario.sobreNome}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  newMessageButton: {
    backgroundColor: '#00aaff',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
  },
  newMessageButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 16,
  },
});

export default MensagensScreen;
