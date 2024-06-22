import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Escola from '../pages/Perfil/Escola';
import PerfilUser from '../pages/Perfil/PerfilUser';
import Usuarios from '../pages/Perfil/Escola/TipoCadastro/Usuarios/Usuarios';
import CadastrarUsuario from '../pages/Perfil/Escola/TipoCadastro/Usuarios/CadastrarUsuario';
import Turmas from '../pages/Perfil/Escola/TipoCadastro/Turmas/Turmas';
import CadastrarTurma from '../pages/Perfil/Escola/TipoCadastro/Turmas/CadastrarTurma';
import EditarTurma from '../pages/Perfil/Escola/TipoCadastro/Turmas/EditaTurma';
import Matriculas from '../pages/Perfil/Escola/TipoCadastro/Matriculas/Matriculas';
import CadastroMatriculas from '../pages/Perfil/Escola/TipoCadastro/Matriculas/CadastroMatriculas';
import EditaMatricula from '../pages/Perfil/Escola/TipoCadastro/Matriculas/EditaMatricula';
import Atividades from '../pages/Perfil/Escola/TipoCadastro/Atividades/Atividades';
import CadastrarAtividades from '../pages/Perfil/Escola/TipoCadastro/Atividades/CadastrarAtividades';
import EditarAtividade from '../pages/Perfil/Escola/TipoCadastro/Atividades/EditarAtividade';
import TipoCadastro from '../pages/Perfil/Escola/TipoCadastro';
import Calendario from '../pages/Calendario';
import Mensagens from '../pages/Mensagens';
import EnviarMensagem from '../pages/Mensagens/EnviarMensagem';
import ResponderMensagem from '../pages/Mensagens/Respondermensagem';

const Stack = createStackNavigator();

const EscolaStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Escola" component={Escola} options={{
      headerShown: true,
    }} />
    <Stack.Screen name="TipoCadastro" component={TipoCadastro} />
    <Stack.Screen name="Usuarios" component={Usuarios} />
    <Stack.Screen name="CadastrarUsuario" component={CadastrarUsuario} />
    <Stack.Screen name="Matriculas" component={Matriculas} />
    <Stack.Screen name="CadastroMatriculas" component={CadastroMatriculas} />
    <Stack.Screen name="EditaMatricula" component={EditaMatricula} />
    <Stack.Screen name="Atividades" component={Atividades} />
    <Stack.Screen name="CadastrarAtividades" component={CadastrarAtividades} />
    <Stack.Screen name="EditarAtividade" component={EditarAtividade} />
    <Stack.Screen name="Turmas" component={Turmas} />
    <Stack.Screen name="CadastrarTurma" component={CadastrarTurma} />
    <Stack.Screen name="EditarTurma" component={EditarTurma} />
    {/*<Stack.Screen name="Mural" component={Mural} />*/}
    <Stack.Screen name="Calendario" component={Calendario} />
    <Stack.Screen name="Mensagens" component={Mensagens} />
    <Stack.Screen name="EnviarMensagem" component={EnviarMensagem} />
    <Stack.Screen name="ResponderMensagem" component={ResponderMensagem} />
    <Stack.Screen name="PerfilUser" component={PerfilUser} />
  </Stack.Navigator>
);

export default EscolaStack;