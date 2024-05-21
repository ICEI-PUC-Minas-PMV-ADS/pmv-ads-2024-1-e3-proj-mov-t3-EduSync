import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';


const Usuarios = () => {


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.title}>

                    <Text style={styles.title}>Usuários</Text>

                </View>
            </View>
        </ScrollView>
    )
}

export default Usuarios

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F6F6F9',
        padding: 40,
    },

    title: {
        fontSize: 34,
        fontWeight: 'bold',
        paddingTop: 30,
        paddingBottom: 30,
    },

})