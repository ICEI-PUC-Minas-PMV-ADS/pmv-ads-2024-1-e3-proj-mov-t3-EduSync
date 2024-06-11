import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Button, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import Picker from 'react-native-picker-select';
import { fetchProfessores, cadastrarTurma } from '../../../../../Service/api'

const CadastrarTurma = ({ usuario }) => {

    const [descricao, setDescricao] = useState('');
    const [professores, setProfessores] = useState([]);
    const [professorSelecionado, setProfessorSelecionado] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfessores = async () => {
            try {
                const professores = await fetchProfessores();
                setProfessores(professores);
                setLoading(false); // Dados carregados com sucesso
                console.log('Professores:', professores);
                professores.map(professor => (console.log('Professores:', professor.nome)));
                professores.map(professor => (console.log('Professores id:', professor.id)));
            } catch (error) {
                console.error('Erro ao buscar os professores:', error);
                setLoading(false); // Parar o carregamento em caso de erro
            }
        };

        getProfessores();
    }, []);

    const handleCadastrarTurma = async () => {
        const turma = {
            descricao: descricao,
            usuarioId: usuario.id,
            usuario: usuario,
            professorId: professorSelecionado,
        };

        try {
            await cadastrarTurma(turma);
            Alert.alert('Sucesso', 'Turma cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar a turma:', error);
            Alert.alert('Erro', 'Não foi possível cadastrar a turma.');
        }
    };

    if (loading) {
        return <Text>Carregando professores...</Text>;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastre uma turma</Text>
                    <View style={styles.containerForm}>
                        <View style={styles.containerInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="Descrição"
                                autoCorrect={false}
                                required={true}
                                onChangeText={descricao => setDescricao(descricao)}
                            />
                            {/* <Picker
                                selectedValue={professorSelecionado}
                                onValueChange={itemValue => setProfessorSelecionado(itemValue)}
                                style={styles.picker}
                                key={0}
                            >
                                <Picker.Item
                                    key={0}
                                    label="Teste"
                                    value="Teste"
                                />
                            </Picker> */}

                            <TouchableOpacity style={styles.btnSubmit}>
                                <Button title="Cadastrar" onPress={handleCadastrarTurma} style={styles.submitText} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({

    scrollView: {
        flexGrow: 1,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        width: 80,
        height: 80,
    },
    container: {
        flex: 1,
        backgroundColor: '#00aaff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 50,
        color: '#fff',
        fontSize: 25,
    },
    containerForm: {
        flex: 1,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        margin: 15,
    },
    containerInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: '90%',
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 20,
        borderRadius: 10,
        fontSize: 15,
    },
    btnSubmit: {
        backgroundColor: '#fff',
        width: '60%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginBottom: 20,
        marginTop: 20,
    },
    submitText: {
        fontSize: 17,
        color: '#87cefa',
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


export default CadastrarTurma