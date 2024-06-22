import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getMatriculas,deleteMatricula } from '../../../../../Service/Matriculas'; 

const MatriculasScreen = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        const response = await getMatriculas();
        setMatriculas(response);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as matrícula.');
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchMatriculas();
    }
    
    
  }, [isFocused]);

  const handleDelete = async (id) => {
    try {
      await deleteMatricula(id);      
      setMatriculas(matriculas.filter(matricula => matricula.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível remover a Matrícula.');
    }

   
  };

  const handleEdit = (matricula) => {
    navigation.navigate('EditaMatricula', {  matriculaId: matricula.id });
  };

  const handleAdd = () => {
    navigation.navigate('CadastroMatriculas');
  };

  const renderMatircula= ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.aluno.nome}</Text>
      <Text style={styles.cell}>{item.turma.descricao}</Text>
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
        <Text style={styles.addButtonText}>Nova Matrícula</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Aluno</Text>
        <Text style={styles.headerCell}>Turma</Text>
        <Text style={styles.headerCell}>Ações</Text>
      </View>
      <FlatList
        data={matriculas}
        renderItem={renderMatircula}
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

export default MatriculasScreen;
