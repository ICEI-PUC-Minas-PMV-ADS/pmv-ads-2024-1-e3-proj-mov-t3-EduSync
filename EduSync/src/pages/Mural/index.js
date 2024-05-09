import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const formatDate = (date) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    locale: 'pt-BR',
  };
  const formattedDate = new Date(date).toLocaleDateString('pt-BR', options);
  const [weekday, day, , month] = formattedDate.split(' ');
  return { weekday: weekday, day, month };
};

const Mural = () => {
  const [currentDate, setCurrentDate] = useState({});

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
    <View>
      <Text style={styles.mainTitle}>MURAL</Text>
      <LinearGradient
        colors={['#2499DB', '#37BCE7']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.container}>
        <Text style={styles.date}>
          <Text style={styles.weekday}>{currentDate.weekday}</Text>
        </Text>
        <Text style={styles.date}>
          <Text style={styles.day}>{currentDate.day} </Text>
          <Text style={styles.month}>de {currentDate.month}</Text>
        </Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'left',
  },
  container: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignSelf: 'center',
    alignItems: 'left',
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
