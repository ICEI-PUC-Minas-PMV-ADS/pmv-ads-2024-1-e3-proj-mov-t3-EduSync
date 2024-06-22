import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Responsavel from '../pages/Perfil/Responsavel';
import PerfilUser from '../pages/Perfil/PerfilUser';
import Mural from '../pages/Mural';
import Mensagens from '../pages/Mensagens';
import EnviarMensagem from '../pages/Mensagens/EnviarMensagem';
import ResponderMensagem from '../pages/Mensagens/Respondermensagem';

import Calendario from '../pages/Calendario';

const Stack = createStackNavigator();

const ResponsavelStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Responsavel" component={Responsavel} />
      <Stack.Screen name="PerfilUser" component={PerfilUser} />
      <Stack.Screen name="Mural" component={Mural}  />
      <Stack.Screen name="Mensagens" component={Mensagens} />
      <Stack.Screen name="EnviarMensagem" component={EnviarMensagem} />
      <Stack.Screen name="ResponderMensagem" component={ResponderMensagem} />
      <Stack.Screen name="Calendario" component={Calendario} />
     
    </Stack.Navigator>
  );
};

export default ResponsavelStack;