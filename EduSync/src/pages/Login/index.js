import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Ionicons  from 'react-native-vector-icons/Feather';
import { CheckBox } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';

const Login = () => { 

  const navigation = useNavigation();
  const [accept, setAccept] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[hidePass, setHidePass] = useState(true);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedResponsavel, setSelectedResponsavel] = useState(false);
  const [selectedEscola, setSelectedEscola] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(false);
  


  const handleLogin = () => {
    if (email === '' || password === '') {
      alert('Preencha todos os campos');
      return;
    }

    switch (selectedUser) {

      case 'responsavel':
        navigation.navigate('Responsavel');
        break;
  
      case 'escola':
        navigation.navigate('Escola');
        break;
  
      case 'professor':
        navigation.navigate('Professor');
        break;

        default:
        alert('Selecione um tipo de usuário');
  
  
    }

  };





  return (

      <View style={styles.container}>


        <View style={styles.containerLogo}>

         <Image
          source={require('../../assets/Logo.png')}

         />

        </View>

        <View style={styles.inputArea}>

          <TextInput style ={styles.input}
            placeholder=" Digite seu Email"
            autoCorrect={false}
            onChangeText={setEmail}
            placeholderTextColor= "#a9a9a9"
            value={email}
            
          />
            
          
          <Ionicons style={styles.iconEmail} name= "mail" color={"#a9a9a9"} size={25}/>
            

        </View>

        <View style={styles.inputArea}>

          <TextInput style ={styles.input}
          placeholderTextColor= "#a9a9a9"
            placeholder=" Digite sua Senha"
            autoCorrect={false}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={hidePass}
          />


          <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>

            {hidePass?
              <Ionicons name = "lock" color={"#a9a9a9"} size={25}/>
              :
              <Ionicons name = "unlock" color={"#a9a9a9"} size={25}/>
            }
          
          </TouchableOpacity>

        </View>

        <View style={styles.inputArea}>

          <Picker style={styles.picker}

            selectedValue={selectedUser}
            onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}

          >
            <Picker.Item label="Selecionar perfil" value="" />
            <Picker.Item label="Responsável" value="responsavel" />
            <Picker.Item label="Escola" value="escola" />
            <Picker.Item label="Professor" value="professor" />
          </Picker>

        </View>

          
        <View style={styles.btn}>

          <CheckBox checked= {accept} onPress={() => {setAccept ((prev) => !prev);
          
          }} 
          />

          <View >
            
            <Text  style={styles.lembrarSenha}> Lembrar Senha
            </Text>

          </View>

          <TouchableOpacity >

            <Text style ={styles.recuperarSenha} >Recuperar Senha</Text>

          </TouchableOpacity>


        </View>


          <TouchableOpacity style={styles.btnSubmit} onPress={handleLogin} >

            <Text style={styles.submitText}>Acessar</Text>

         </TouchableOpacity>



      </View>

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center',

  },

  containerLogo: {
    
    justifyContent: 'center',
    alignItems:'center',
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
    borderColor:'#a9a9a9',
    borderWidth: 3,
   
    


  },

  input:{

    width: '85%',
    height: 50,
    color:'#a9a9a9',
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
    
    
  },

    icon:{

      width:'15%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      
      
    },

    iconEmail:{

      marginLeft: 15,
      justifyContent: 'center',
      alignItems: 'center',

    },

    btn:{

      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      alignContent: 'center',
      

    },

    lembrarSenha: {

      end: 30,
      height: 50,
      color: '#a9a9a9',
      padding: 8,
      fontSize: 18,

      

    },


    recuperarSenha:{

      marginLeft:15,
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

    picker: {
      flex: 1,
      height: 50,
      color: '#a9a9a9',
      padding: 8,
    },


});

export default Login;