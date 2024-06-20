import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAtividadeById, updateAtividade} from '../../../../../Service/AtividadesService';

const EditarAtividade = () => {

  const [descricao, setDescricao] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const Atividade  = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {    
        const atividadeData = await getAtividadeById(Atividade.atividade.id);
        
        setDescricao(atividadeData.descricao);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível carregar os dados.');
      }
    };
    fetchData();
  }, [Atividade]);

  const handleUpdate = async () => {
    if (!descricao) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
        const atividadeData = {
            descricao: descricao,
            dtInclusao: Atividade.dtInclusao,
            dtAlteracao: Atividade.dtInclusao
          };
      await updateAtividade(Atividade.atividade.id, atividadeData);

      Alert.alert('Sucesso', 'Atividade atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar a ativdade.');
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
      
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Atualizar Atividade</Text>
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

export default EditarAtividade;
