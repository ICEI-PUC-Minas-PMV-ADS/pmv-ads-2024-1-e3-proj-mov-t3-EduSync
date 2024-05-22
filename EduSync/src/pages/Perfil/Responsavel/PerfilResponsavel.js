import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons';
import Ionicons from 'react-native-vector-icons/AntDesign';

const PerfilResponsavel = () => {

  const navigation = useNavigation();

  const EditarUsuario = () => {
    navigation.navigate('EditarUsuario');
  };

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://edusync20240424230659.azurewebsites.net/api/Usuarios/11', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image style={styles.loading} source={require('../../../assets/loading.gif')} />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar dados do usuário</Text>
      </View>
    );
  }

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
          <Image style={styles.profileImage} source={require('../../../assets/Profile.jpg')} />
          <Text style={styles.name}>{userData.nome} {userData.sobreNome}</Text>
        </View>

        <View style={styles.containerInfo}>
          <View style={styles.info}>
            <View style={styles.editContainer}>
              <Text style={styles.label}>Nome:</Text>
              <TouchableOpacity>
                <Text style={styles.edit} onPress={EditarUsuario}>Alterar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.value}>{userData.nome} {userData.sobreNome}</Text>
            <View style={styles.border} />
          </View>

          <View style={styles.info}>
            <View style={styles.editContainer}>
              <Text style={styles.label}>E-mail:</Text>
              <TouchableOpacity>
                <Text style={styles.edit} onPress={EditarUsuario}>Alterar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.value}>{userData.email} </Text>
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

export default PerfilResponsavel;
