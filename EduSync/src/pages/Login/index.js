import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const Login = () => { 


  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        
        <Image
          source={require('../../assets/EduSync.png')}
          style={{ width: '60%'}}
          resizeMode='contain'
        />
      
      </View>

      <View style={styles.containerForm}>

        <View style={styles.containerInputs}>


          <TextInput style ={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={() => {}}
          />
          <TextInput style ={styles.input}
            placeholder="Senha"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={() => {}}
          />

          <TouchableOpacity style ={styles.btnSubmit}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>

          <Text style={styles.register}> Não tem uma conta ?
          </Text>

          <TouchableOpacity style ={styles.btnRegister}>

            <Text style ={styles.registerText}>Cadastre-se</Text>
          </TouchableOpacity>

          
        </View>



      </View>

      

    </View>


  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#87cefa'
  },
  containerLogo: {

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    
  },

  containerForm : {

    
    flex: 1.2,
    width: '90%',
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 15,


  },
  containerInputs: {
    
    width: '80%',
    alignItems: 'center',
    
  },

  input: {

    width: '100%',
    backgroundColor: '#2222',
    marginBottom: 15,
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    

  },

  btnSubmit: {

    backgroundColor: '#87cefa',
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    

  },

  submitText: {

    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },

  register:{

    fontSize:15,
    
  },

  registerText:{

    
    fontSize:15,
    fontWeight: 'bold',

  }



});

export default Login;