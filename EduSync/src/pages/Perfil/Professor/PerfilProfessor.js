import {useNavigation} from '@react-navigation/native';
import React, { useState ,useLayoutEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import CustomNavBar from '../../../components/CustomNavBar';

const PerfilProfessor = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');


  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader escolaNome="Escola - ED. Infantil" />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
      <Text style={styles.name}>Nome do Professor</Text>
      </View>
      <CustomNavBar />
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