import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AtividadesScreen = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // Obtém o token armazenado
        if (!token) {
          Alert.alert('Erro', 'Token de autenticação não encontrado.');
          return;
        }

        const response = await axios.get('https://edusync20240424230659.azurewebsites.net/api/Atividades', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAtividades(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as Atividades.');
      } finally {
        setLoading(false);
      }
    };

    fetchAtividades();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Obtém o token armazenado
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }

      await axios.delete(`https://edusync20240424230659.azurewebsites.net/api/Atividades/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAtividades(atividades.filter(atividade => atividade.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível remover a atividade.');
    }
  };

  const handleEdit = (atividade) => {
    navigation.navigate('EditAtividade', { atividade });
  };

  const handleAdd = () => {
    navigation.navigate('AddAtividade');
  };

  const renderAtividade = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.descricao}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleEdit(item)}>
        <Ionicons name="pencil" size={20} color="blue" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#00aaff" />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Adicionar Atividade</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Descrição</Text>
        <Text style={styles.headerCell}>Ações</Text>
      </View>
      <FlatList
        data={atividades}
        renderItem={renderAtividade}
        keyExtractor={(item) => item.id.toString()}
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
  addButton: {
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
  },
  button: {
    padding: 8,
  },
});

export default AtividadesScreen;
