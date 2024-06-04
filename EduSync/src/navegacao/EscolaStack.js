import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Escola from '../pages/Perfil/Escola';
import PerfilEscola from '../pages/Perfil/Escola/PerfilEscola';
import Usuarios from '../pages/Perfil/Escola/TipoCadastro/Usuarios/Usuarios';
import CadastrarUsuario from '../pages/Perfil/Escola/TipoCadastro/Usuarios/CadastrarUsuario';
import Turmas from '../pages/Perfil/Escola/TipoCadastro/Turmas/Turmas';
import Matriculas from '../pages/Perfil/Escola/TipoCadastro/Matriculas/Matriculas';
import Atividades from '../pages/Perfil/Escola/TipoCadastro/Atividades/Atividades';
import Mural from '../pages/Mural';
import TipoCadastro from '../pages/Perfil/Escola/TipoCadastro';

import Calendario from '../pages/Calendario';
import Mensagens from '../pages/Mensagens';

const Stack = createStackNavigator();

const EscolaStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Escola" component={Escola}  options={{
                  headerShown: true,                  
                }} />
    <Stack.Screen name="Usuarios"       component={Usuarios}      />
    <Stack.Screen name="CadastrarUsuario"   component={CadastrarUsuario}      />
    <Stack.Screen name="Atividades"     component={Atividades}      />
    <Stack.Screen name="PerfilEscola"   component={PerfilEscola}  />
    <Stack.Screen name="Mural"          component={Mural}         />
    <Stack.Screen name="Turmas"         component={Turmas}        />
    <Stack.Screen name="Matriculas"         component={Matriculas}        />
    <Stack.Screen name="TipoCadastro"   component={TipoCadastro}  />
    <Stack.Screen name="Calendario"     component={Calendario}    />
    <Stack.Screen name="Mensagens"      component={Mensagens}     />
  </Stack.Navigator>
);

export default EscolaStack;