import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Responsavel = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Responsável</Text>
      {/* Adicione aqui os elementos para exibir as informações do responsável */}
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

export default Responsavel;