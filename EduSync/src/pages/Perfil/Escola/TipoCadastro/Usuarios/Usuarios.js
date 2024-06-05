import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UsuarioScreen = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://edusync20240424230659.azurewebsites.net/api/Usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os usuários.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://edusync20240424230659.azurewebsites.net/api/Usuarios/${id}`);
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível remover o usuário.');
    }
  };

  const handleEdit = (usuario) => {
    navigation.navigate('EditUsuario', { usuario });
  };

  const handleAdd = () => {
    navigation.navigate('CadastrarUsuario');
  };

  const getPerfilDescricao = (tipoPerfil) => {
    switch (tipoPerfil) {
      case 1:
        return 'ADM';
      case 2:
        return 'Professor';
      case 3:
        return 'Responsável';
      case 4:
        return 'Aluno';
      default:
        return 'Desconhecido';
    }
  };

  const renderUsuario = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nome}</Text>
      <Text style={styles.cell}>{getPerfilDescricao(item.tipoPerfil)}</Text>
      <Text style={styles.cell}>{item.login}</Text>
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
        <Text style={styles.addButtonText}>Adicionar Usuário</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Nome</Text>
        <Text style={styles.headerCell}>Perfil</Text>
        <Text style={styles.headerCell}>Login</Text>
        <Text style={styles.headerCell}>Ações</Text>
      </View>
      <FlatList
        data={usuarios}
        renderItem={renderUsuario}
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

export default UsuarioScreen;
