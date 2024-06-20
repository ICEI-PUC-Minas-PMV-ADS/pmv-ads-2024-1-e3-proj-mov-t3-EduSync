import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAtividades, deleteAtividade } from '../../../../../Service/AtividadesService';

const AtividadesScreen = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchAtividades = async () => {
      setLoading(true);
      try {
        const dados = await getAtividades();
        setAtividades(dados);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar as Atividades.');
      } finally {
        setLoading(false);
      }
    };
    if (isFocused) {
      fetchAtividades();
    }
  }, [isFocused]);

  const handleDelete = async (id) => {
    try {
      await deleteAtividade(id);
      setAtividades(atividades.filter(atividade => atividade.id !== id));
      Alert.alert('Sucesso', 'Atividade Removida!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível remover a atividade.');
    }
  };

  const handleEdit = (atividade) => {
    navigation.navigate('EditarAtividade', { atividade });
  };

  const handleAdd = () => {
    navigation.navigate('CadastrarAtividades');
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
