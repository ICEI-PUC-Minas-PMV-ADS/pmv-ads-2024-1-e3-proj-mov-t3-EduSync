import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';

const PerfilResponsavel = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  return (
    <ScrollView>
      <View style={styles.container}>

        <TouchableOpacity style={styles.ConfigIcons} >

          <Ionicons name="setting" size={30} color={"#a9a9a9"} />

        </TouchableOpacity>

        <View style={styles.title}>

          <Text style={styles.title}>Perfil</Text>

        </View>

        <View style={styles.containerName}>
          <Image style={styles.profileImage} source={require('../../../assets/Profile.jpg')} />
          <Text style={styles.name}>João Ferreira</Text>
        </View>

        <View style={styles.containerInfo}>

          <View style={styles.info}>
            <View style={styles.editContainer}>
              <Text style={styles.label}>Nome:</Text>
              <TouchableOpacity>
                <Text style={styles.edit}>Alterar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.value}>João Ferreira</Text>
            <View style={styles.border} />
          </View>

          <View style={styles.info}>
            <View style={styles.editContainer}>
              <Text style={styles.label}>Endereço:</Text>
              <TouchableOpacity>
                <Text style={styles.edit}>Alterar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.value}>Rua do Carmo - Centro - Santa Luzia</Text>
            <View style={styles.border} />
          </View>

          <View style={styles.info}>
            <View style={styles.editContainer}>
              <Text style={styles.label}>E-mail:</Text>
              <TouchableOpacity>
                <Text style={styles.edit}>Alterar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.value}>joao.ferreira@gmai.com</Text>
            <View style={styles.border} />
          </View>

          <View style={styles.info}>
            <View style={styles.editContainer}>
              <Text style={styles.label}>Celular:</Text>
              <TouchableOpacity>
                <Text style={styles.edit}>Alterar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.value}>(31) 99834-0943</Text>
            <View style={styles.border} />
          </View>

          <View style={styles.info}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>João Ferreira</Text>
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
          <Ionicons name="exclamationcircleo" size={30} color={"#a9a9a9"} />
          <Text>Mural</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => { }}>
          <Ionicons name="calendar" size={30} color={"#a9a9a9"} />
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
    </ScrollView >
  );
};
const styles = StyleSheet.create({

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
  },

  info: {
    marginBottom: 35,
  },

  editContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  edit: {
    font: 10,
    color: '#31A05F'
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
    marginBottom: 10,
    marginTop: 50,
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

export default PerfilResponsavel;