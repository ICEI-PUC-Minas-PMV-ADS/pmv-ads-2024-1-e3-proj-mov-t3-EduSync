import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';



const Mural = () => {

    return (

        <View>
            <View style={styles.container}>
                <Text style={styles.mainTitle}>Mural</Text>

                <View>
                    <Text style={styles.currentDay}>Quarta-feira</Text>
                    <Text style={styles.currentDate}>3 de Abril</Text>
                </View>
            </View>
        </View >
    )

}

const styles = StyleSheet.create({

    container: {
        margin: 50,
        width: '100%',
    },

    mainTitle: {
        fontSize: 34,
        fontWeight: 700,
        color: 'red',
    },

    containerDate: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    currentDay: {
        fontSize: 20,
        color: 'black',
    },

    currentDate: {
        fontSize: 32,
        color: 'black',
    }
})

export default Mural