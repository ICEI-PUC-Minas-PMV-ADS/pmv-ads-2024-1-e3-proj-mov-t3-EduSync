import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Professor from '../pages/Perfil/Professor';
import Mural from '../pages/Mural';
import LancamentoMural from '../pages/Mural/LacamentoMural';
import Calendario from '../pages/Calendario';
import Mensagens from '../pages/Mensagens';
import EnviarMensagem from '../pages/Mensagens/EnviarMensagem';
import ResponderMensagem from '../pages/Mensagens/Respondermensagem';
import PerfilUser from '../pages/Perfil/PerfilUser';

const Stack = createStackNavigator();

const ProfessorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Professor"  component={Professor}/>
      <Stack.Screen name="PerfilUser" component={PerfilUser} />
      <Stack.Screen name="Mural" component={Mural}  />
      <Stack.Screen name="LancamentoMural" component={LancamentoMural}  />
      <Stack.Screen name="Calendario" component={Calendario}  />
      <Stack.Screen name="Mensagens" component={Mensagens} />
      <Stack.Screen name="EnviarMensagem" component={EnviarMensagem} />
      <Stack.Screen name="ResponderMensagem" component={ResponderMensagem} />
    </Stack.Navigator>
  );
};

export default ProfessorStack;
