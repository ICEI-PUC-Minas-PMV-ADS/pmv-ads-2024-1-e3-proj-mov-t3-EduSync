import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Professor from '../pages/Perfil/Professor';
import Mural from '../pages/Mural';
import Calendario from '../pages/Calendario';
import Mensagens from '../pages/Mensagens';
import PerfilProfessor from '../pages/Perfil/Professor/PerfilProfessor';

const Stack = createStackNavigator();

const ProfessorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Professor"
        component={Professor}        
      />
      <Stack.Screen
        name="PerfilProfessor"
        component={PerfilProfessor}        
      />
      <Stack.Screen
        name="Mural"
        component={Mural}        
      />
      <Stack.Screen
        name="Calendario"
        component={Calendario}        
      />
      <Stack.Screen
        name="Mensagens"
        component={Mensagens}        
      />
    </Stack.Navigator>
  );
};

export default ProfessorStack;
