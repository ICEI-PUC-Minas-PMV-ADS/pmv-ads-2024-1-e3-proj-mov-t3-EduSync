import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../Service/api'; 

const Login = () => { 
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePass, setHidePass] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const clearAsyncStorage = async () => {
        try {
          await AsyncStorage.clear();
        } catch (error) {
          console.error('Failed to clear AsyncStorage:', error);
        }
      };
      clearAsyncStorage();
    }, [])
  );

  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      switch (userData.user.tipoPerfil) {
        case 1:
          navigation.navigate('Escola');
          break;
        case 2:
          navigation.navigate('Professor');
          break;
        case 3:
          navigation.navigate('Responsavel');
          break;
        case 4:
          navigation.navigate('Aluno');
          break;
        default:
          navigation.navigate('Welcome');
      }
    } catch (error) {
      Alert.alert('Falha no Login', 'Email ou Senha Inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image source={require('../../assets/Logo.png')} />
      </View>
      <View style={styles.inputArea}>
        <TextInput 
          style={styles.input}
          placeholder="Digite seu Email"
          autoCorrect={false}
          onChangeText={setEmail}
          placeholderTextColor="#a9a9a9"
          value={email}            
        />          
        <Ionicons style={styles.iconEmail} name="mail" color="#a9a9a9" size={25} />
      </View>
      <View style={styles.inputArea}>
        <TextInput 
          style={styles.input}
          placeholder="Digite sua Senha"
          autoCorrect={false}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={hidePass}
          placeholderTextColor="#a9a9a9"
        />
        <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
          <Ionicons name={hidePass ? "lock" : "unlock"} color="#a9a9a9" size={25} />          
        </TouchableOpacity>
      </View>          
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('RecuperarSenha')}>
        <Text style={styles.recuperarSenha}>Recuperar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnSubmit} onPress={handleLogin}>
        <Text style={styles.submitText}>Acessar</Text>
      </TouchableOpacity>
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
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8%',
  },
  inputArea: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#a9a9a9',
    borderWidth: 3,  
  },
  input: {
    width: '85%',
    height: 50,
    color: '#a9a9a9',
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',    
  },
  icon: {
    width: '15%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',      
  },
  iconEmail: {
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {      
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
  },
  recuperarSenha: {      
    marginLeft: '50%',
    height: 50,
    color: '#a9a9a9',
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnSubmit: {
    backgroundColor: '#87cefa',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7, 
  },
  submitText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Login;