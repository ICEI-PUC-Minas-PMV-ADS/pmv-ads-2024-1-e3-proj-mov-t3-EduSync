// src/screens/Mural/MuralScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTurmaProfessor } from '../../Service/TurmasService';
import { getFilhosResponsavel } from '../../Service/Matriculas';
import { USER_PERFIL_PROFESSOR, USER_PERFIL_RESPONSAVEL } from '../../constantes';

const MuralScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPerfil, setUserPerfil] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userPerfil = await AsyncStorage.getItem('userPerfil');
        setUserPerfil(userPerfil);

        let fetchedData;
        if (userPerfil === USER_PERFIL_PROFESSOR) {
          fetchedData = await getTurmaProfessor(userId);
          fetchedData = fetchedData.map(turma => ({
            id: turma.id,
            descricao: turma.descricao,
          }));
        } else if (userPerfil === USER_PERFIL_RESPONSAVEL) {
          fetchedData = await getFilhosResponsavel(userId);
          fetchedData = fetchedData.map(matricula => ({
            id: matricula.aluno.id,
            descricao: `${matricula.aluno.nome} ${matricula.aluno.sobreNome}`,
          }));
        }

        setData(fetchedData);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do mural.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePress = (item) => {
    if (userPerfil === USER_PERFIL_PROFESSOR) {
      navigation.navigate('LancamentoMural', { id: item.id });
    } else if (userPerfil === USER_PERFIL_RESPONSAVEL) {
      navigation.navigate('DetalheMural', { id: item.id });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      <Text style={styles.itemText}>{item.descricao}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#00aaff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Precione uma turma para realizar lançamentos de Atividades.
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
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
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  instructions: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#87cefa',
    borderRadius: 8,
  },
});

export default MuralScreen;
