import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Professor = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Professor</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Professor;