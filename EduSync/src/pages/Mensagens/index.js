import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect ,useLayoutEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import CustomHeader from '../../components/CustomHeader';
import CustomNavBar from '../../components/CustomNavBar';

const formatDate = (date) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    locale: 'pt-BR',
  };
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', options);
  const [weekday, day, , month] = formattedDate.split(' ');
  return { weekday, day, month };
};

const Mural = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader escolaNome="Escola - ED. Infantil" />,
    });
  }, [navigation]);

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      setCurrentDate(formatDate(date));
    };

    getCurrentDate();

    const interval = setInterval(getCurrentDate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Mensagens</Text>
      
      <CustomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingBottom: 60, // Adiciona espaço para a barra de navegação
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'left',
  },
  gradientContainer: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  date: {
    fontSize: 20,
    color: 'white',
  },
  weekday: {
    color: 'white',
    fontSize: 20,
  },
  day: {
    color: 'white',
    fontSize: 30,
  },
  month: {
    color: 'white',
    fontSize: 30,
  },
});

export default Mural;