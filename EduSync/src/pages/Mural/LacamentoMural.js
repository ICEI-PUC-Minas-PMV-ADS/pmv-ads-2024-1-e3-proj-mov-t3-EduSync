import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, Button,TouchableOpacity  } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { getMatriculasTurma } from '../../Service/Matriculas';
import { getAtividades } from '../../Service/AtividadesService';
import { lancarAvaliacao } from '../../Service/MuralService';
import { getTurmaById } from '../../Service/TurmasService';


const LancamentoMural = ({ route }) => {
  const { id } = route.params;
  const [atividades, setAtividades] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [selectedAtividade, setSelectedAtividade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avaliacoes, setAvaliacoes] = useState({});
  const [descricaoTurma, setDescricaoTurma] = useState('');
  const [nomeProfessor, setNomeProfessor] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName'); // Assuming userName is stored
        setNomeProfessor(userName);

        const atividadesData = await getAtividades();
        setAtividades([{ id: null, descricao: 'Selecione' }, ...atividadesData]);

        const turmaData = await getTurmaById(id);
        setDescricaoTurma(turmaData.descricao);

        const matriculasData = await getMatriculasTurma(id);
        setMatriculas(matriculasData);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAvaliacaoChange = (idMatricula, rating) => {
    setAvaliacoes(prev => ({
      ...prev,
      [idMatricula]: rating
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const lancamentos = matriculas.map(matricula => ({
        idMatricula: matricula.id,
        idAtividade: selectedAtividade,
        avaliacao: avaliacoes[matricula.id] || 0,
        dtLancamento: selectedDate.toISOString(),
        dtInclusao: new Date().toISOString(),
        dtAlteracao: new Date().toISOString(),
      }));

      await Promise.all(lancamentos.map(lancarAvaliacao));
      Alert.alert('Sucesso', 'Avaliações lançadas com sucesso.');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível lançar as avaliações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMatriculas = async () => {
      try {
        setLoading(true);
        const matriculasData = await getMatriculasTurma(id);
        setMatriculas(matriculasData);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedAtividade !== null) {
      fetchMatriculas();
    }
  }, [selectedAtividade]);

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00aaff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Turma: {descricaoTurma}</Text>
        <Text style={styles.header}>Professor: {nomeProfessor}</Text>
      </View>
      <Text style={styles.instructions}>
        Para lançar as avaliações, siga os seguintes passos:
        1. Informe uma data de Lançamento.
        2. Selecione uma atividade da lista.
        3. Avalie cada aluno usando as estrelas fornecidas.
        4. Clique no botão "Lançar Avaliações" para salvar.
      </Text>
      <Text style={styles.title}>Data</Text>
      <TouchableOpacity style={styles.datePickerContainer} onPress={() => setShowDatePicker(true)}>
        <Text>{formatDate(selectedDate)}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.title}>Selecione uma Atividade</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedAtividade}
          onValueChange={(itemValue) => setSelectedAtividade(itemValue)}
          style={styles.picker}
        >
          {atividades.map(atividade => (
            <Picker.Item key={atividade.id} label={atividade.descricao} value={atividade.id} />
          ))}
        </Picker>
      </View>
      
      <FlatList
        data={matriculas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.aluno.nome} {item.aluno.sobreNome}</Text>
            <AirbnbRating
              count={5}
              defaultRating={0}
              size={20}
              showRating={false}
              onFinishRating={(rating) => handleAvaliacaoChange(item.id, rating)}
            />
          </View>
        )}
      />
      <Button title="Lançar Avaliações" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 4,
  },
  instructions: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#87cefa',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  datePickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    //backgroundColor: '#f0f0f0',
    alignItems: 'center',
    width: '100%',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
  },
});

export default LancamentoMural;
