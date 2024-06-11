import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import CustomNavBar from '../../../components/CustomNavBar';
import Icon from 'react-native-ionicons';
import Ionicons from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PerfilProfessor = () => {

  const [userName, setUserName] = useState(null);
  const [sobreNome, setsobreNome] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      const nome = await AsyncStorage.getItem('userName');
      setUserName(nome);
      const sobrenome = await AsyncStorage.getItem('sobreNome');
      setsobreNome(sobrenome);
      const emailaddress = await AsyncStorage.getItem('email');
      setEmail(emailaddress);
    };
    fetchUserName();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.ConfigIcons}>
          <Ionicons name="setting" size={30} color={"#a9a9a9"} />
        </TouchableOpacity>

        <View style={styles.title}>
          <Text style={styles.title}>Perfil</Text>
        </View>

        <View style={styles.containerName}>
          <Image style={styles.profileImage} source={require('../../../assets/icon-professor.png')} />
          <Text style={styles.name}>{userName} {sobreNome}</Text>
        </View>

        <View style={styles.containerInfo}>
          <View style={styles.info}>
            <View style={styles.editContainer}>
              <Text style={styles.label}>Nome:</Text>
            </View>
            <Text style={styles.value}>{userName}</Text>
            <View style={styles.border} />
          </View>

          <View style={styles.info}>
            <View style={styles.editContainer}>
              <Text style={styles.label}>E-mail:</Text>
            </View>
            <Text style={styles.value}>{email}</Text>
            <View style={styles.border} />
          </View>
        </View>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.icons} onPress={() => { }}>
          <Ionicons name="home" size={30} color={"#a9a9a9"} />
          <Text>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => { }}>
          <Icon name="information-circle-outline" size={20} color={"#a9a9a9"} />
          <Text>Mural</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => { }}>
          <Icon name="calendar-outline" size={20} color={"#a9a9a9"} />
          <Text>Calendário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => { }}>
          <Ionicons name="mail" size={30} color={"#a9a9a9"} />
          <Text>Mensagens</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => { }}>
          <Ionicons name="user" size={30} color={"#a9a9a9"} />
          <Text>Perfil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F6F6F9',
    padding: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 30,
  },

  containerName: {
    flex: 1,
    alignItems: 'center',
  },

  name: {
    fontSize: 24,
    marginTop: 20,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  containerInfo: {
    flex: 1,
    paddingTop: 35,
    paddingBottom: '100%',
  },

  info: {
    marginBottom: 35,
  },

  editContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  edit: {
    fontSize: 10,
    color: '#31A05F',
  },

  label: {
    fontSize: 12,
  },

  value: {
    fontSize: 15,
  },

  border: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 7,
  },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingRight: 20,
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: '#F6F6F9', // Adiciona uma cor de fundo para o navBar
  },

  ConfigIcons: {
    marginLeft: '80%',
  },

  icons: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default PerfilProfessor;