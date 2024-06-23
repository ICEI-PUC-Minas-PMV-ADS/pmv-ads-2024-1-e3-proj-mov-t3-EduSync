import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import Star from '../../components/Star';

// Função para formatar a data de início com hora, minutos e segundos zerados
const formatDateToISOStart = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00.000Z`;
};

// Função para formatar a data de fim com hora 23:59:59
const formatDateToISOEnd = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}T23:59:59.000Z`;
};

const DetalheMural = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;//id cadastro user
  const [idMatricula, setMatriculaAluno] = useState('');
  const [alunoNome, setAlunoNome] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [atividades, setAtividades] = useState([]);

  useEffect(() => {
    const fetchNomeAluno = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`https://edusync20240424230659.azurewebsites.net/api/Matricula/GetMatriculasAluno/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const primeiraMatricula = response.data[0];
        setAlunoNome(`${primeiraMatricula.aluno.nome} ${primeiraMatricula.aluno.sobreNome}`);
        setMatriculaAluno(primeiraMatricula.id);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar o nome do aluno.');
      }
    };

    fetchNomeAluno();
  }, [id]);

  useEffect(() => {
    if (idMatricula) { 
      buscarAtividades();
    }
  }, [idMatricula, dataSelecionada]);
  
  const buscarAtividades = async () => {
    try {        
      const token = await AsyncStorage.getItem('userToken');
      const dataInicioISO = formatDateToISOStart(dataSelecionada); // Formatar a data de início
      const dataFimISO = formatDateToISOEnd(dataSelecionada); // Formatar a data de fim
      console.log('ID Matrícula:', idMatricula);
    console.log('Data Início:', dataInicioISO);
    console.log('Data Fim:', dataFimISO);
      const response = await axios.get(`https://edusync20240424230659.azurewebsites.net/api/Mural/GetMuraisMatricula/${idMatricula}/dateInicio/${dataInicioISO}/dateFim/${dataFimISO}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAtividades(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as atividades.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDataSelecionada(selectedDate);
      setShowDatePicker(false);
    }
  };

  const renderAtividade = ({ item }) => {
    let formattedDate = 'Data inválida';
    if (item.dtLancamento) {
      try {
        formattedDate = format(new Date(item.dtLancamento), 'dd/MM/yyyy');
      } catch (error) {
        console.error(`Erro ao formatar a data: ${item.dtLancamento}`, error);
      }
    }

    return (
      <View style={styles.atividadeContainer}>        
        <Text style={styles.atividadeDescricao}>{item.atividade.descricao}</Text>
        <Star rating={item.avaliacao} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{alunoNome}</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text>{format(dataSelecionada, 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataSelecionada}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <FlatList
        data={atividades}
        renderItem={renderAtividade}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listaAtividades}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma atividade encontrada para a data selecionada.</Text>}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dateInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  atividadeContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  atividadeData: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  atividadeDescricao: {
    fontSize: 14,
  },
  listaAtividades: {
    paddingBottom: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: '#999',
  },
});

export default DetalheMural;
