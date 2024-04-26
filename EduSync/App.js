import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './src/pages/Welcome';
import Login from './src/pages/Login';
import Escola from './src/pages/Perfil/Escola';
import Professor from './src/pages/Perfil/Professor';
import Responsavel from './src/pages/Perfil/Responsavel';
import Cadastrar from './src/pages/Cadastrar';
import PerfilEscola from './src/pages/Perfil/Escola/PerfilEscola';
import PerfilResponsavel from './src/pages/Perfil/Responsavel/PerfilResponsavel';
import PerfilProfessor from './src/pages/Perfil/Professor/PerfilProfessor';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Welcome"
          component={Welcome}


        />
        <Stack.Screen
          name="Login"
          component={Login}

        />

        <Stack.Screen
          name="Cadastrar"
          component={Cadastrar}

        />

        <Stack.Screen
          name="Escola"
          component={Escola}
        />

        <Stack.Screen
          name="Professor"
          component={Professor}
        />

        <Stack.Screen
          name="Responsavel"
          component={Responsavel}
        />

        <Stack.Screen
          name="PerfilEscola"
          component={PerfilEscola}

        />

        <Stack.Screen
          name="PerfilProfessor"
          component={PerfilProfessor}
        />

        <Stack.Screen
          name="PerfilResponsavel"
          component={PerfilResponsavel}
        />

      </Stack.Navigator>

      <StatusBar backgroundColor="#87cefa" barStyle="light-content" />

    </NavigationContainer>
  );
};

export default App;