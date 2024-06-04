import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Responsavel from '../pages/Perfil/Responsavel';
import PerfilResponsavel from '../pages/Perfil/Responsavel/PerfilResponsavel';
import Mural from '../pages/Mural';
import EditarUsuario from '../pages/Perfil/Responsavel/EditarUsuario';

const Stack = createStackNavigator();

const ResponsavelStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PerfilResponsavel" component={PerfilResponsavel} />
      <Stack.Screen
        name="Mural"
        component={Mural}        
      />
      <Stack.Screen
        name="EditarUsuario"
        component={EditarUsuario}        
      />
    </Stack.Navigator>
  );
};

export default ResponsavelStack;