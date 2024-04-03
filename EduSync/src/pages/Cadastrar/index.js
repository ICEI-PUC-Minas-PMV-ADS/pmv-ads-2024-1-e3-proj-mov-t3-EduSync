import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';


const Cadastrar = () => {
  return (

    <View style ={styles.container}>

      <View style = {styles.containerLogo}>

        <Image source={require('../../assets/EduSync.png')}
        style ={{width: '60%'}}
        resizeMode='contain'/>

      </View>

      <View style = {styles.containerForm}>

        <View style ={styles.containerInput}>

          <TextInput style = {styles.input}
            placeholder = "Nome"
            autoCorrect = {false}
            onChangeText ={() => {}} 

          />

          <TextInput style = {styles.input}
            placeholder = "Email"
            autoCorrect = {false}
            onChangeText ={() => {}} 
            
          />

          <TextInput style = {styles.input}
            placeholder = "Senha"
            autoCorrect = {false}
            onChangeText ={() => {}} 
            
          />

          <TextInput style = {styles.input}
            placeholder = "Confirmar Senha"
            autoCorrect = {false}
            onChangeText ={() => {}} 
            
          />
            

            <TouchableOpacity style ={styles.btnSubmit}>

              <Text style ={styles.submitText}>Cadastrar</Text>

            </TouchableOpacity>







        </View>

      </View>

    </View>


  )

}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#87cefa'

  },

  containerLogo: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },


  containerForm: {

    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 15,

  },

  containerInput: {

    width: 300,
    
  },

  input: {

    
    width:300,
    backgroundColor: '#2222',
    marginBottom: 10,
    padding: 6,
    borderRadius:10,
    fontSize: 15,

  },


  btnSubmit: {

    backgroundColor: '#87cefa',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,

  },

  submitText: {

    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',

  },

});

export default Cadastrar;