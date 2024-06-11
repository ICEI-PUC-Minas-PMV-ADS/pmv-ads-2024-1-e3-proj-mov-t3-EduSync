import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { cadastrarAtividade, verificarAtividadeExistente } from '../../../../../Service/api'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastrarAtividades = () => {
    const [descricao, setDescricao] = useState('');

    const handleCadastrarAtividade = async () => {
        const atividade = {
            descricao: descricao
        };

        if (!descricao) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('userToken');
            const atividadeExiste = await verificarAtividadeExistente(descricao, token);

            if (atividadeExiste) {
                Alert.alert('Erro', 'Já existe uma atividade com essa descrição.');
                return;
            }

            await cadastrarAtividade(atividade, token);
            Alert.alert('Sucesso', 'Atividade cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar a atividade:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar a atividade.');
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <Text style={styles.subtitle}>Exemplo: Presença, almoço, lanche...</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Descrição"
                    autoCorrect={false}
                    required={true}
                    onChangeText={descricao => setDescricao(descricao)}
                />
                <TouchableOpacity style={styles.button} onPress={handleCadastrarAtividade}>
                    <Text title="Cadastrar" style={styles.buttonText}>Registrar Atividade</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
    subtitle: {
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 0,
        color: '#bbb',
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
        alignItems: 'center',
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: '#a9a9a9',
        paddingRight: 30,
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 7,
        marginTop: 2,
        marginBottom: 8,
        width: '90%',
        alignSelf: 'center',
    },
    inputAndroid: {
        borderRadius: 7,
        fontSize: 16,
        paddingHorizontal: 10,
        color: '#a9a9a9',
        paddingRight: 30,
    },
});


export default CadastrarAtividades