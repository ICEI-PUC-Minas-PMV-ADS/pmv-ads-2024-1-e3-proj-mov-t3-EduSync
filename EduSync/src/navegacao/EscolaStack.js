import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Escola from '../pages/Perfil/Escola';
import PerfilEscola from '../pages/Perfil/Escola/PerfilEscola';
import Usuarios from '../pages/Perfil/Escola/Usuarios';
import CadastrarTurma from '../pages/CadastrarTurma';
import Mural from '../pages/Mural';


import TipoCadastro from '../pages/TipoCadastro';

const Stack = createStackNavigator();

const EscolaStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Menu Principal" component={Escola}  options={{
                  headerShown: true,                  
                }} />
    <Stack.Screen name="Usuarios" component={Usuarios} />
    <Stack.Screen name="PerfilEscola" component={PerfilEscola} />
    <Stack.Screen name="Mural" component={Mural} />
    <Stack.Screen name="CadastrarTurma" component={CadastrarTurma} />
    <Stack.Screen name="TipoCadastro" component={TipoCadastro} />
  </Stack.Navigator>
);

export default EscolaStack;