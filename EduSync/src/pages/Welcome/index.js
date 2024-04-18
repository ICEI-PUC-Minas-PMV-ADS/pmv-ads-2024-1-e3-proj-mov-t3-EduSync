import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';



const Welcome = () => { 

  const navigation = useNavigation();

  return (

      <View style={styles.container}>


        <View style={styles.containerLogo}>

          <Image source = {require('../../assets/EduSync.jpg')}/>

        </View>

        <View style={styles.btn}>

          <Text style={styles.title}> Conexão dentro e fora de casa  </Text>
          <Text style={styles.text}> Fique por dentro de tudo que acontece na escola de seu filho(a).</Text>

        </View>

        <View style={styles.btnText}>

          <Text style={styles.text}>Faça o login para começar</Text>

        </View>


        <TouchableOpacity style={styles.btnSubmit}
          onPress={() => navigation.navigate('Login')}
        >

          <Text style={styles.submitText}>Acessar</Text>

        </TouchableOpacity>




      </View>

  );
};

const styles = StyleSheet.create ({

  container: {

    flex:1,
    backgroundColor: '#fff',
    
    

  },

  containerLogo: {

    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },


  btn: {

    width:'90%',
    
    alignItems:'center',
    alignContent: 'center',
    alignSelf: 'center',
    

  },

  title:{
    
    textAlign:'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '10%',
    

  },

  text:{


    textAlign:'center',
    fontSize: 20,
    color: '#a1a1a1',
    marginBottom:10,

  },

  btnText:{
    
    marginTop:'10%',
    fontSize: 20,
    alignItems:'center',
    alignContent:'center',
    marginBottom: 10,
  },

  btnSubmit:{

   
    backgroundColor: '#87cefa',
    width:'90%',
    height: 45,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    borderRadius: 20,

  },

  submitText: {
    
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },



})

export default Welcome;