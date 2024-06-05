import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const CadastroMatriculas = () => {
  const [alunos, setAlunos] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [selectedResponsavel1, setSelectedResponsavel1] = useState(null);
  const [selectedResponsavel2, setSelectedResponsavel2] = useState(null);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [dataMatricula, setDataMatricula] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const [alunosResponse, responsaveisResponse, turmasResponse] = await Promise.all([
          axios.get('https://edusync20240424230659.azurewebsites.net/api/Usuarios/Alunos', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://edusync20240424230659.azurewebsites.net/api/Usuarios/Responsaveis', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://edusync20240424230659.azurewebsites.net/api/Turmas', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAlunos(alunosResponse.data);
        setResponsaveis(responsaveisResponse.data);
        setTurmas(turmasResponse.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    };

    fetchData();
  }, []);

  const handleRegister = async () => {
    if (!selectedAluno || !selectedResponsavel1 || !selectedTurma || !dataMatricula) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.post('https://edusync20240424230659.azurewebsites.net/api/Matricula', {
        alunoId: selectedAluno,
        responsavel1Id: selectedResponsavel1,
        responsavel2Id: selectedResponsavel2,
        turmaId: selectedTurma,
        dataMatricula: dataMatricula.toISOString(),
        dataInclusao: new Date().toISOString(),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Sucesso', 'Matrícula registrada com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível registrar a matrícula.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataMatricula;
    setShowDatePicker(false);
    setDataMatricula(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Aluno</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedAluno(value)}
        items={alunos.map(aluno => ({ label: `${aluno.nome} ${aluno.sobreNome}`, value: aluno.id, key: aluno.id  }))}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecione o aluno', value: null }}
      />

      <Text style={styles.label}>Responsável 1</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedResponsavel1(value)}
        items={responsaveis.map(responsavel => ({ label: responsavel.nome, value: responsavel.id, key: responsavel.id  }))}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecione o responsável', value: null }}
      />

      <Text style={styles.label}>Responsável 2</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedResponsavel2(value)}
        items={responsaveis.map(responsavel => ({ label: responsavel.nome, value: responsavel.id  , key: responsavel.id }))}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecione o responsável (opcional)', value: null }}
      />

      <Text style={styles.label}>Turma</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedTurma(value)}
        items={turmas.map(turma => ({ label: turma.descricao, value: turma.id , key: turma.id}))}
        style={pickerSelectStyles}
        placeholder={{ label: 'Selecione a turma', value: null }}
      />

      <Text style={styles.label}>Data da Matrícula</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text>{format(dataMatricula, 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataMatricula}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar Matrícula</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
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
  button: {
    backgroundColor: '#00aaff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
  },
  inputAndroid: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
  },
});

export default CadastroMatriculas;
