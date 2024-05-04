import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';




const Cadastrar = () => {

  return (

    <View style={styles.container}>

      {/* <View style={styles.containerLogo}>

        <Image source={require('../../assets/EduSync.jpg')}
          style={{ width: '60%' }}
          resizeMode='contain' />

      </View> */}

      <View style={styles.containerForm}>

        <View style={styles.containerInput}>

          <TextInput style={styles.input}
            placeholder="Login"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Confirmar Senha"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Nome"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="CEP"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Logradouro"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Número"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Complemento"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Bairro"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Cidade"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Tipo"
            autoCorrect={false}
            onChangeText={() => { }}
          />

          <TextInput style={styles.input}
            placeholder="Matrícula"
            autoCorrect={false}
            onChangeText={() => { }}
          />


          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.submitText}>Cadastrar</Text>
          </TouchableOpacity>

        </View>

      </View>

    </View>


  )

}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#87cefa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    padding: 10,
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
  },

  submitText: {
    fontSize: 17,
    color: '#87cefa',
    fontWeight: 'bold',
  },

});

export default Cadastrar;