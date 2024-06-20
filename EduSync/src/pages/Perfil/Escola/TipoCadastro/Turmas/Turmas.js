import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getTurmas, deleteTurma } from '../../../../../Service/AtividadesService';

const TurmasScreen = () => {
const [turmas, setTurmas] = useState([]);
const [loading, setLoading] = useState(true);
const navigation = useNavigation();
const isFocused = useIsFocused();


  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      try {        
        const dados = await getTurmas();
        setTurmas(dados);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      } finally {
        setLoading(false);
      }
    };
    if (isFocused) {
      fetchTurmas();
    }    
  }, [isFocused]);

  const handleDelete = async (id) => {
    try {
      await deleteTurma(id);
      setTurmas(turmas.filter(turma => turma.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível remover o usuário.');
    }
  };

  const handleEdit = (turma) => {
    navigation.navigate('EditarTurma', { turma });
  };

  const handleAdd = () => {
    navigation.navigate('CadastrarTurma');
  };

  const renderTurma = ({ item }) => (
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
        <Text style={styles.addButtonText}>Adicionar Turma</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Descrição</Text>
        <Text style={styles.headerCell}>Ações</Text>
      </View>
      <FlatList
        data={turmas}
        renderItem={renderTurma}
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

export default TurmasScreen;
