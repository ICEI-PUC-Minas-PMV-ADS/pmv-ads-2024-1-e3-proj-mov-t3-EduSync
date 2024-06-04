import React, { useEffect, useState } from 'react';
import { Button, View,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Welcome from './src/pages/Welcome';
import Login from './src/pages/Login';


import EscolaStack from './src/navegacao/EscolaStack';
import ResponsavelStack from './src/navegacao/ResponsavelStack';
import ProfessorStack from './src/navegacao/ProfessorStack';

const Stack = createNativeStackNavigator();

const App = () => { 

  return (
   
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Escola" component={EscolaStack} options={{ headerShown: false }} />
      <Stack.Screen name="Professor" component={ProfessorStack} options={{ headerShown: false }} />
      <Stack.Screen name="Responsavel" component={ResponsavelStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );

};

export default App;