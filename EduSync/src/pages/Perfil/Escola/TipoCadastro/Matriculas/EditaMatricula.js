import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateMatricula, getMatriculaById } from '../../../../../Service/Matriculas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';


const EditMatriculaScreen = () => {
  const [alunos, setAlunos] = useState([]);
  const [responsaveis, setResponsaveis] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [alunoNome, setAlunoNome] = useState('');
  const [selectedResponsavel1, setSelectedResponsavel1] = useState(null);
  const [selectedResponsavel2, setSelectedResponsavel2] = useState(null);
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [dataMatricula, setDataMatricula] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { matriculaId } = route.params;

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

        setAlunos(alunosResponse.data.map(aluno => ({ label: `${aluno.nome} ${aluno.sobreNome}`, value: aluno.id })));
        setResponsaveis(responsaveisResponse.data.map(responsavel => ({ label: `${responsavel.nome} ${responsavel.sobreNome}`, value: responsavel.id })));
        setTurmas(turmasResponse.data.map(turma => ({ label: turma.descricao, value: turma.id })));

        const matricula = await getMatriculaById(matriculaId, token);
        const aluno = alunosResponse.data.find(aluno => aluno.id === matricula.idAluno);
        setSelectedAluno(matricula.idAluno);
        setAlunoNome(`${aluno.nome} ${aluno.sobreNome}`);
        setSelectedResponsavel1(matricula.idResponsavel1);
        setSelectedResponsavel2(matricula.idResponsavel2);
        setSelectedTurma(matricula.idTurma);
        setDataMatricula(matricula.dtMatricula.split('T')[0]);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    };

    fetchData();
  }, [matriculaId]);

  const handleUpdate = async () => {
    if (!selectedAluno || !selectedResponsavel1 || !selectedTurma || !dataMatricula) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const matriculaData = {
      idAluno: selectedAluno,
      idResponsavel1: selectedResponsavel1,
      idResponsavel2: selectedResponsavel2,
      idTurma: selectedTurma,
      dtMatricula: new Date(dataMatricula).toISOString(),
      dtInclusao: new Date().toISOString()
    };

    try {
      await updateMatricula(matriculaId, matriculaData);
      Alert.alert('Sucesso', 'Matrícula atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Matriculas') },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar a matrícula.');
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataMatricula;
    setShowDatePicker(Platform.OS === 'ios');
    setDataMatricula(currentDate);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Aluno</Text>
        <Text style={styles.value}>{alunoNome}</Text>

        <Text style={styles.label}>Responsável 1</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedResponsavel1(value)}
          items={responsaveis}
          value={selectedResponsavel1}
          style={pickerSelectStyles}
          placeholder={{ label: 'Selecione um responsável', value: null }}
        />

        <Text style={styles.label}>Responsável 2</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedResponsavel2(value)}
          items={responsaveis}
          value={selectedResponsavel2}
          style={pickerSelectStyles}
          placeholder={{ label: 'Selecione um responsável (opcional)', value: null }}
        />

        <Text style={styles.label}>Turma</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedTurma(value)}
          items={turmas}
          value={selectedTurma}
          style={pickerSelectStyles}
          placeholder={{ label: 'Selecione uma turma', value: null }}
        />

        <Text style={styles.label}>Data da Matrícula</Text>
        <TextInput
          style={styles.input}
          value={dataMatricula}
          onChangeText={setDataMatricula}
          placeholder="YYYY-MM-DD"
        />       

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Atualizar Matrícula</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    padding: 8,
    marginBottom: 16,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#00aaff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#A9F5F2',
    color: '#000',
    fontSize: 16,
  },
  inputAndroid: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#F2F2F2',
    color: '#000',
    fontSize: 16,
  },
  placeholder: {
    color: '#a9a9a9',
    fontSize: 16,
  },
  
});
export default EditMatriculaScreen;
