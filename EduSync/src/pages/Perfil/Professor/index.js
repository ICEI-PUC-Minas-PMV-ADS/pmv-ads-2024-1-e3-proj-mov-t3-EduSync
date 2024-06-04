import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import IoniconsA from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../../components/CustomHeader';

const Professor = () => {

  const navigation = useNavigation();

  const PerfilProfessor = () => {
    navigation.navigate('PerfilProfessor');
  };

  const Mensagens = () => {
    navigation.navigate('Mensagens');
  };

  const Mural = () => {
    navigation.navigate('Mural');
  };

  const Calendario = () => {
    navigation.navigate('Calendario');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader escolaNome="Escola - ED. Infantil" />,
    });
  }, [navigation]); 

  return (

    <View style={styles.container}>
      
      <View>
        <Text style={styles.welcome}>Aréa do Professor</Text>
      </View>

      <View style={styles.grid}>

        <TouchableOpacity style={styles.button} onPress={Mural}>
          <Text>MURAL</Text>
          <IoniconsA style={styles.icon} name="exclamationcircleo" color={"#a9a9a9"} size={25} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Mensagens}>
          <Text>MENSAGENS</Text>
          <Ionicons style={styles.icon} name="mail" color={"#a9a9a9"} size={25}  />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={Calendario}>
          <Text>CALENDÁRIO</Text>
          <Ionicons style={styles.icon} name="calendar" color={"#a9a9a9"} size={25} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={PerfilProfessor}>
          <Text>PERFIL</Text>
          <IoniconsA style={styles.icon} name="user" color={"#a9a9a9"} size={25} />
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
    marginLeft: '80%',
    marginBottom: '20%',
  },

  welcome: {
    fontSize: 24,
    color: '#fff',
    marginTop: 0,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  button: {
    width: '40%',
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },

  icon: {
    marginTop: '5%',
  }

});

export default Professor;