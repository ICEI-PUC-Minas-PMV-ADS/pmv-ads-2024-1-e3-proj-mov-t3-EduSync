import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../Service/api';

const CustomHeader = ({ escolaNome }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const nome = await AsyncStorage.getItem('userName');
      setUserName(nome);
    };
    fetchUserName();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  const handleNotificationsPress = () => {
    navigation.navigate('Mensagens');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <Text style={styles.escolaNome}>{escolaNome}</Text>
      </View>
      <View style={styles.headerBottom}>
        <Text style={styles.welcomeText}>Bem vindo, {userName}</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={{ marginRight: 15 }} onPress={handleNotificationsPress}>
            <Ionicons name="notifications" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Feather name="log-out" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  escolaNome: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomHeader;
