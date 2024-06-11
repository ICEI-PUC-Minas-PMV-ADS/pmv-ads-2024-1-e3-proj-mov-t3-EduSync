import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

const CadastrarTurma = () => {
    const [professores, setProfessores] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const professoresResponse = await axios.get('https://edusync20240424230659.azurewebsites.net/api/Usuarios/Professores', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfessores(professoresResponse.data);
            } catch (error) {
                console.error(error);
                Alert.alert('Erro', 'Não foi possível carregar os dados.');
            }
        };

        fetchData();
    }, []);

    const handleRegister = async () => {
        if (!selectedProfessor || !descricao) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('userToken');
            await axios.post('https://edusync20240424230659.azurewebsites.net/api/Turmas', {
                descricao: descricao,
                usuarioId: selectedProfessor,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert('Sucesso', 'Turma registrada com sucesso!');
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Não foi possível registrar a turma.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                autoCorrect={false}
                required={true}
                onChangeText={descricao => setDescricao(descricao)}
            />
            <Text style={styles.label}>Professor(a):</Text>
            <RNPickerSelect
                onValueChange={(value) => setSelectedProfessor(value)}
                items={professores.map(professor => ({ label: `${professor.nome} ${professor.sobreNome}`, value: professor.id, key: professor.id }))}
                style={pickerSelectStyles}
                placeholder={{ label: 'Selecione o(a) professor(a)', value: null }}
            />
            {/* 
      <Text style={styles.label}>Data da criação da turma</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text>{format(dataTurma, 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dataTurma}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )} */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar Turma</Text>
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


export default CadastrarTurma