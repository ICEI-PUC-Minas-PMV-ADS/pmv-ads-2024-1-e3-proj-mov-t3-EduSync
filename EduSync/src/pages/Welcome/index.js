import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';



const Welcome = () => { 

  const navigation = useNavigation();

  return (


    <View style= {styles.container }>


      <View style= {styles.containerLogo}>

        <Image source ={require('../../assets/EduSync.jpg')}
        style={{width: '60%'}}
        resizeMode="contain"
        
      
        
        
        />
        <View style={styles.containerForm}>

          <Text style={styles.title}>Fique por dentro de tudo que acontece na escola de seu filho!</Text>
          <Text style={styles.text}>Faça o Login para começar</Text>

          <TouchableOpacity style={styles.button}
            onPress= {() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

        </View>


      </View>

    </View>
  );
};

const styles = StyleSheet.create ({

  container: {
    flex:1,
    backgroundColor: '#87cefa'

  },

  containerLogo: {

    flex: 2,
    backgroundColor: '#87cefa',
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  containerForm : {

    
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 30,
    marginBottom: 20,
    paddingStart: '5%',
    paddingEnd: '5%',

  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },

  text: {

    marginTop: '30%',
    fontSize: 20,
    color: '#a1a1a1'
  },

  button: {
    position: 'absolute',
    backgroundColor: '#87cefa',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',

  },

  buttonText: {

    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',

  }



})

export default Welcome;