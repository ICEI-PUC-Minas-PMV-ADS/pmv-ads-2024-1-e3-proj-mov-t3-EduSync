import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, updateUser } from '../../Service/UserService';

const PerfilUser = () => {

    const [userId, setUserId] = useState(null); 
    const [userName, setUserName] = useState(null);
    const [sobreNome, setsobreNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [login, setLogin] = useState(null);
    const [senha, setSenha] = useState(null);
    const [novaSenha, setNovaSenha] = useState(null);
    const [confirmarSenha, setConfirmarSenha] = useState(null);
  
  const fetchUserProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); 
      setUserId(userId);
      const userProfile = await getUser(userId);
      const { nome, sobreNome, email, login } = userProfile;
      setUserName(nome);
      setsobreNome(sobreNome);
      setEmail(email);
      setLogin(login);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    if ((novaSenha) && (novaSenha !== confirmarSenha)) {
      Alert.alert('Erro', 'A nova senha e a confirmação da nova senha não são iguais.');
      return;
    }
    
    try {
        await updateUser(userId, { nome: userName, sobreNome: sobreNome, email, login, senha:novaSenha,  });
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.configIcons}>
          <Ionicons name="settings-outline" size={30} color={"#a9a9a9"} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Perfil</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={require('../../assets/icon-professor.png')} />
        </View>

       

        <View style={styles.formContainer}>
        <Text style={styles.instructions}>
        Para alterar senha siga os passos:
        1. Informe sua senha Atual.
        2. Crie uma nova senha.
        3. confirme a nova senha.
      </Text>
          <Text style={styles.label}>Nome:</Text>
          <TextInput style={styles.input} value={userName} onChangeText={setUserName} />

          <Text style={styles.label}>Sobrenome:</Text>
          <TextInput style={styles.input} value={sobreNome} onChangeText={setsobreNome} />

          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Login:</Text>
          <TextInput style={styles.input} value={login} onChangeText={setLogin} />

          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry={true} />

          <Text style={styles.label}>Nova Senha:</Text>
          <TextInput style={styles.input} value={novaSenha} onChangeText={setNovaSenha} secureTextEntry={true} />

          <Text style={styles.label}>Confirmar Nova Senha:</Text>
          <TextInput style={styles.input} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={true} />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F9',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  configIcons: {
    alignSelf: 'flex-end',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#00aaff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  instructions: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#87cefa',
    borderRadius: 8,
  },
});

export default PerfilUser;
