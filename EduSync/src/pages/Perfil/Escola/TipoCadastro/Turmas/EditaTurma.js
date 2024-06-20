import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getProfessores, getTurmaById, updateTurma } from '../../../../../Service/TurmasService';

const EditarTurma = () => {
  const [professores, setProfessores] = useState([]);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [descricao, setDescricao] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const turmaId  = route.params.turma;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const professoresData = await getProfessores();
        setProfessores(professoresData);       
        
        const turmaData = await getTurmaById(turmaId.id);
        setDescricao(turmaData.descricao);
        setSelectedProfessor(turmaData.usuarioId);

      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    };

    fetchData();
  }, [turmaId]);

  const handleUpdate = async () => {
    if (!selectedProfessor || !descricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
        const turmaData = {
            descricao: descricao,
            usuarioId: selectedProfessor,
            dtInclusao: turmaId.dtInclusao,
            dtAlteracao: turmaId.dtInclusao
          };
      await updateTurma(turmaId.id, turmaData);

      Alert.alert('Sucesso', 'Turma atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar a turma.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        autoCorrect={false}
        value={descricao}
        onChangeText={setDescricao}
      />
      <Text style={styles.label}>Professor(a):</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedProfessor(value)}
        items={professores.map(professor => ({ label: `${professor.nome} ${professor.sobreNome}`, value: professor.id, key: professor.id }))}
        style={pickerSelectStyles}
        value={selectedProfessor}
        placeholder={{ label: 'Selecione o(a) professor(a)', value: null }}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar Turma</Text>
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
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#ccc',
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

export default EditarTurma;
