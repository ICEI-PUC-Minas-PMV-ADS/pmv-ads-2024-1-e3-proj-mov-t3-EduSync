import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Button, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import Picker from 'react-native-picker-select';

const CadastrarResponsavel = () => {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [tipo, setTipo] = useState(null);
    const [matricula, setMatricula] = useState('');
    const [endereco, setEndereco] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cep.length === 8) {
            consultarCep();
        }
    }, [cep]);

    useEffect(() => {
        if (endereco) {
            setLogradouro(endereco.logradouro || '');
            setBairro(endereco.bairro || '');
            setCidade(endereco.localidade || '');
        }
    }, [endereco]);

    const cadastrarUsuario = async () => {
        if (loading) return;

        setLoading(true);

        if (Validate()) {
            let payload = {
                nome: nome,
                sobreNome: sobrenome,
                email: email,
                login: login,
                senha: senha,
                tipoPerfil: parseInt(tipo),
            };

            console.log('payload', payload);

            try {
                const response = await fetch('https://edusync20240424230659.azurewebsites.net/api/Usuarios', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    alert('Usuário cadastrado com sucesso!')
                }

                const json = await response.json();
                console.log('response', json);
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);
                alert('Erro ao cadastrar usuário')
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    const consultarCep = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const json = await response.json();
            setEndereco(json);
            console.log('endereco', json);
        } catch (error) {
            console.error('Erro ao consultar CEP:', error);
        }
    };

    const Validate = () => {
        if (login === '' || senha === '' || nome === '' || sobrenome === '' || email === '' || cep === '' || logradouro === '' || numero === '' || complemento === '' || bairro === '' || cidade === '' || matricula === '') {
            alert('Preencha todos os campos');
            return false;
        }
        // if (senha !== confirmaSenha) {
        //   alert('As senhas não coincidem');
        //   return false;
        // }
        return true;
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Image style={styles.loading} source={require('../../assets/loading.gif')} />
                </View>
            ) : (
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Cadastre um usuário</Text>
                        <View style={styles.containerForm}>
                            <View style={styles.containerInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Login"
                                    autoCorrect={false}
                                    required={true}
                                    onChangeText={login => setLogin(login)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Senha"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    passwordRules=""
                                    textContentType="none"
                                    onChangeText={senha => setSenha(senha)}
                                />
                                {/* <TextInput
                  style={styles.input}
                  placeholder="Confirmar Senha"
                  autoCorrect={false}
                  textContentType="none"
                  passwordRules=""
                  secureTextEntry={true}
                  onChangeText={confirmaSenha => setConfirmaSenha(confirmaSenha)}
                /> */}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nome"
                                    autoCorrect={false}
                                    onChangeText={nome => setNome(nome)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Sobrenome"
                                    autoCorrect={false}
                                    onChangeText={sobrenome => setSobrenome(sobrenome)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    autoCorrect={false}
                                    onChangeText={email => setEmail(email)}
                                    keyboardType='email-address'
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="CEP"
                                    autoCorrect={false}
                                    onChangeText={cep => setCep(cep)}
                                    keyboardType='numeric'
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Logradouro"
                                    value={logradouro}
                                    autoCorrect={false}
                                    onChangeText={value => setLogradouro(value)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Número"
                                    autoCorrect={false}
                                    onChangeText={value => setNumero(value)}
                                    keyboardType='numeric'
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Complemento"
                                    autoCorrect={false}
                                    onChangeText={value => setComplemento(value)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Bairro"
                                    value={bairro}
                                    autoCorrect={false}
                                    onChangeText={value => setBairro(value)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Cidade"
                                    value={cidade}
                                    autoCorrect={false}
                                    onChangeText={value => setCidade(value)}
                                />
                                <Picker
                                    style={pickerSelectStyles}
                                    onValueChange={(value) => setTipo(value)}
                                    value={tipo}
                                    items={[
                                        { label: 'Responsável', value: '1' },
                                        { label: 'Escola', value: '2' },
                                        { label: 'Professor', value: '3' },
                                    ]}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Matrícula"
                                    autoCorrect={false}
                                    onChangeText={matricula => setMatricula(matricula)}
                                    keyboardType='numeric'
                                />
                                <TouchableOpacity style={styles.btnSubmit}>
                                    <Button title="Cadastrar" onPress={cadastrarUsuario} style={styles.submitText} />
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

export default CadastrarResponsavel;
