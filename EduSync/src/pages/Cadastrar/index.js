import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Button, ScrollView, Form } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Cadastrar = () => {

  const [login, setLogin] = useState(null)
  const [senha, setSenha] = useState(null)
  const [confirmaSenha, setconfirmaSenha] = useState(null)
  const [nome, setNome] = useState(null)
  const [sobrenome, setSobrenome] = useState(null)
  const [email, setEmail] = useState(null)
  const [cep, setCep] = useState('')
  const [logradouro, setLogradouro] = useState('')
  const [numero, setNumero] = useState(null)
  const [complemento, setComplemento] = useState(null)
  const [bairro, setBairro] = useState(null)
  const [cidade, setCidade] = useState(null)
  const [tipo, setTipo] = useState(null)
  const [matricula, setMatricula] = useState(null)
  const [endereco, setEndereco] = useState('')

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Escola', value: '1' },
    { label: 'Professor(a)', value: '2' },
    { label: 'Responsável', value: '3' }
  ]);

  //Função de cadastrar usuário
  const cadastrarUsuario = async () => {

    if (handleCadastrar()) {


      let payload = {
        nome: nome,
        sobreNome: sobrenome,
        email: email,
        login: login,
        senha: senha,
        tipoPerfil: parseInt(value),
      }

      console.log('payload', payload)
      //Chamada a API Edusync
      const response = await fetch('https://edusync20240424230659.azurewebsites.net/api/Usuarios', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
      console.log('response', response)
        .then((json) => console.log(json));

      useEffect(() => {
        consultarCep();
      }, []);

    }
  }

  useEffect(() => {
    // Atualize os campos de endereço sempre que o estado `endereco` mudar
    if (endereco) {
      setLogradouro(endereco.logradouro);
      setBairro(endereco.bairro);
      setCidade(endereco.localidade);
    }
  }, [endereco]);

  //Chamada a API de consultar CEP
  const consultarCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const json = await response.json();
      setEndereco(json);
      console.log('endereco', endereco);
    } catch (error) {
      console.error('Erro ao consultar CEP:', error);
    }
  };

  const handleCadastrar = () => {

    if (login === '' || senha === '' || confirmaSenha === '' || nome === '' || sobrenome === ''
      || email === '' || cep === '' || logradouro === '' || numero === '' || complemento === ''
      || bairro === '' || cidade === '' || matricula === '') {
      alert('Preencha todos os campos');
      return false;
    }
    return true
  }


  return (

    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastre um usuário</Text>
        <View style={styles.containerForm}>

          <View style={styles.containerInput}>

            <TextInput style={styles.input}
              placeholder="Login"
              autoCorrect={false}
              required={true}
              onChangeText={login => setLogin(login)}
            />

            <TextInput style={styles.input}
              placeholder="Senha"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={senha => setSenha(senha)}
            />

            <TextInput style={styles.input}
              placeholder="Confirmar Senha"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={confirmaSenha => setconfirmaSenha(confirmaSenha)}
            />

            <View style={styles.warningContainer}>
              <Text style={styles.warningMessage}></Text>
            </View>

            <TextInput style={styles.input}
              placeholder="Nome"
              autoCorrect={false}
              onChangeText={nome => setNome(nome)}
            />

            <TextInput style={styles.input}
              placeholder="Sobrenome"
              autoCorrect={false}
              onChangeText={sobrenome => setSobrenome(sobrenome)}
            />

            <TextInput style={styles.input}
              placeholder="Email"
              autoCorrect={false}
              onChangeText={email => setEmail(email)}
              keyboardType='email-address'
            />

            <TextInput style={styles.input}
              placeholder="CEP"
              autoCorrect={false}
              onChangeText={cep => setCep(cep)}
              onEndEditing={consultarCep}
              keyboardType='numeric'
            />

            <TextInput style={styles.input}
              placeholder="Logradouro"
              value={endereco.logradouro}
              autoCorrect={false}
              onChangeText={value => setLogradouro(value)}
            />

            <TextInput style={styles.input}
              placeholder="Número"
              autoCorrect={false}
              onChangeText={value => setNumero(value)}
              keyboardType='numeric'
            />

            <TextInput style={styles.input}
              placeholder="Complemento"
              autoCorrect={false}
              onChangeText={value => setComplemento(value)}
            />

            <TextInput style={styles.input}
              placeholder="Bairro"
              value={endereco.bairro}
              autoCorrect={false}
              onChangeText={value => setBairro(value)}
            />

            <TextInput style={styles.input}
              placeholder="Cidade"
              value={endereco.localidade}
              autoCorrect={false}
              onChangeText={value => setCidade(value)}
            />
            <View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Selecione o tipo"
              />
            </View>

            {/* <TextInput style={styles.input}
              placeholder="Tipo"
              autoCorrect={false}
              onChangeText={value => setTipo(value)}
              keyboardType='numeric'
            /> */}

            <TextInput style={styles.input}
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
  )
}

const styles = StyleSheet.create({

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
    // backgroundColor: '#fff',
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

  warningContainer: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },

  warningMessage: {
    color: '#B62323',
    fontSize: 12,
    marginBottom: 15,
  },

  btnSubmit: {
    backgroundColor: '#fff',
    width: '60%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    marginBottom: 20,
    marginTop: 20
  },

  submitText: {
    fontSize: 17,
    color: '#87cefa',
    fontWeight: 'bold',
  },

});

export default Cadastrar;