import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Button, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import Picker from 'react-native-picker-select';

const EditarUsuario = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const editar = async () => {
        if (loading) return;

        setLoading(true);

        if (Validate()) {
            let payload = {
                nome: nome,
                sobreNome: sobrenome,
                email: email,
            };

            console.log('payload', payload);

            try {
                const response = await fetch('https://edusync20240424230659.azurewebsites.net/api/Usuarios/11', {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    alert('Usuário atualizado com sucesso!')
                }

                const json = await response.json();
                console.log('response', json);
            } catch (error) {
                console.error('Erro ao atualizar usuário:', error);
                alert('Erro ao atualizar usuário')
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const Validate = () => {
        if (nome === '' || sobrenome === '' || email === '') {
            alert('Preencha todos os campos');
            return false;
        }

        return true;
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Image style={styles.loading} source={require('../../../assets/loading.gif')} />
                </View>
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar</Text>
                        <View style={styles.containerForm}>
                            <View style={styles.containerInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    autoCorrect={false}
                                    value={nome}
                                    onChangeText={nome => setNome(nome)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Sobrenome"
                                    autoCorrect={false}
                                    value={sobrenome}
                                    onChangeText={sobrenome => setSobrenome(sobrenome)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    autoCorrect={false}
                                    value={email}
                                    onChangeText={email => setEmail(email)}
                                    keyboardType='email-address'
                                />
                                <TouchableOpacity style={styles.btnSubmit} onPress={editar}>
                                    <Text style={styles.submitText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
        width: '100%',
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

export default EditarUsuario;
