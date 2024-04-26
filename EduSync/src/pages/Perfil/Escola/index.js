import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Ionicons  from 'react-native-vector-icons/AntDesign';
import { CheckBox } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

const Escola = () => {

  const navigation = useNavigation();

  const PerfilEscola = () => {
    navigation.navigate(PerfilEscola); 
  };

  return (

    <View style={styles.container}>

      <TouchableOpacity>

        <Ionicons style={styles.BellsIcon} name= "bells" color={"#fff"} size={25}/>

      </TouchableOpacity>

      <View>

        <Text style={styles.welcome}>Bem vindo(a)</Text>

      </View>

      <View style={styles.grid}>

        <TouchableOpacity style={styles.button}>

          <Text>MURAL</Text>

          <Ionicons style={styles.icon} name= "exclamationcircleo" color={"#a9a9a9"} size={25}/>

        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>

          <Text>MENSAGENS</Text>

          <Ionicons style={styles.icon} name= "mail" color={"#a9a9a9"} size={25}/>

        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>

          <Text>CALENDÁRIO</Text>

          <Ionicons style={styles.icon} name= "calendar" color={"#a9a9a9"} size={25}/>

        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={PerfilEscola}>

          <Text>PERFIL</Text>

          <Ionicons style={styles.icon} name= "user" color={"#a9a9a9"} size={25}/>

        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#00aaff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  BellsIcon: {

    marginLeft:'80%',
    marginBottom: '20%',
    


  },

  welcome: {
    fontSize: 24,
    marginBottom: '15%',
    color: '#fff',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  button: {
    width: '40%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },

});

export default Escola;