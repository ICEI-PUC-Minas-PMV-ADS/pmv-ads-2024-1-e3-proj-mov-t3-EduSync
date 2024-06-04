import { useNavigation } from '@react-navigation/native';
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';

import CustomHeader from '../../../../components/CustomHeader';

import CustomNavBar from '../../../../components/CustomNavBar';

const TipoCadastro = () => {

    const navigation = useNavigation();

    const Usuarios = () => {
        navigation.navigate(Usuarios);
    };

    const Turmas = () => {
        navigation.navigate(Turmas);
    };

    const Atividades = () => {
        navigation.navigate(Atividades);
    };

    const Matriculas = () => {
        navigation.navigate(Matriculas);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          header: () => <CustomHeader escolaNome="Escola - ED. Infantil" />,
        });
      }, [navigation]); 

    return (

        <View style={styles.container}>
            <View>
                <Text style={styles.welcome}>Cadastros Permanentes</Text>
            </View>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.button} onPress={Usuarios}>
                    <Text>USUÁRIO</Text>
                    <Ionicons style={styles.icon} name="exclamationcircleo" color={"#a9a9a9"} size={25} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={Turmas}>
                    <Text>TURMA</Text>
                    <Ionicons style={styles.icon} name="exclamationcircleo" color={"#a9a9a9"} size={25} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={Atividades}>
                    <Text>ATIVIDADES</Text>
                    <Ionicons style={styles.icon} name="exclamationcircleo" color={"#a9a9a9"} size={25} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}  onPress={Matriculas}>
                    <Text>MATRÍCULA</Text>
                    <Ionicons style={styles.icon} name="exclamationcircleo" color={"#a9a9a9"} size={25} />
                </TouchableOpacity>
            </View>
            <CustomNavBar />
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#00aaff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    BellsIcon: {
        marginLeft: '80%',
        marginBottom: '20%',
    },

    welcome: {
        
        fontSize: 24,
        color: '#fff',
    },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },

    button: {
        width: '40%',
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },

    icon: {
        marginTop: '5%',
    }

});

export default TipoCadastro;