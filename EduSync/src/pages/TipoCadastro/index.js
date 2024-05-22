import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';

const TipoCadastro = () => {

    const navigation = useNavigation();

    const CadastrarResponsavel = () => {
        navigation.navigate(CadastrarResponsavel);
    };

    const CadastrarTurma = () => {
        navigation.navigate(CadastrarTurma);
    };

    return (

        <View style={styles.container}>

            <TouchableOpacity>

                <Ionicons style={styles.BellsIcon} name="bells" color={"#fff"} size={25} />

            </TouchableOpacity>

            <View>

                <Text style={styles.welcome}>Escolha o tipo de cadastro que deseja:</Text>

            </View>

            <View style={styles.grid}>

                <TouchableOpacity style={styles.button} onPress={CadastrarResponsavel}>

                    <Text>RESPONSÁVEL</Text>

                    <Ionicons style={styles.icon} name="exclamationcircleo" color={"#a9a9a9"} size={25} />

                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={CadastrarTurma}>

                    <Text>TURMA</Text>

                    <Ionicons style={styles.icon} name="exclamationcircleo" color={"#a9a9a9"} size={25} />

                </TouchableOpacity>

            </View>
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
        marginBottom: '15%',
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