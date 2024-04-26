import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Ionicons  from 'react-native-vector-icons/AntDesign';
import { CheckBox } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

const PerfilResponsavel = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  return (
<View style={styles.container}>

      <TouchableOpacity style={styles.ConfigIcons} >

        <Ionicons name="setting" size={30} color={"#a9a9a9"} />

      </TouchableOpacity>

      <View style={styles.profile}>

        <Text style={styles.name}>Nome do Responsavel</Text>

      </View>

      
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.icons} onPress={() => {}}>
          <Ionicons name="home" size={30} color={"#a9a9a9"} />
          <Text>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => {}}>
          <Ionicons name="exclamationcircleo" size={30} color={"#a9a9a9"} />
          <Text>Mural</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => {}}>
          <Ionicons name="calendar" size={30} color={"#a9a9a9"} />
          <Text>Calendário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => {}}>
          <Ionicons name="mail" size={30} color={"#a9a9a9"} />
          <Text>Mensagens</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icons} onPress={() => {}}>
          <Ionicons name="user" size={30} color={"#a9a9a9"} />
          <Text>Perfil</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
};
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },

  ConfigIcons:{

    marginLeft:'80%',
    
    
  },

  icons: {
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default PerfilResponsavel;