import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomNavBar = () => {
    const navigation = useNavigation();
    const [userPerfil, setUserPerfil] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const perfil = await AsyncStorage.getItem('userPerfil');
            setUserPerfil(perfil);
        };
        fetchUserProfile();
    }, []);

    const handleHomePress = () => {
        switch (userPerfil) {
            case '1':
                navigation.navigate('Escola');
                break;
            case '2':
                navigation.navigate('Professor'); 
                break;
            case '3':
                navigation.navigate('Responsavel'); 
                break;
            case '3':
                navigation.navigate('Aluno'); 
                break;                
        }
    };

    return (
        <View style={styles.navBar}>
            <TouchableOpacity style={styles.icons} onPress={handleHomePress}>
                <Ionicons name="home" size={30} color={"#a9a9a9"} />
                <Text>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Mural')}>
                <Ionicons name="notifications" size={30} color={"#a9a9a9"} />
                <Text>Mural</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Calendario')}>
                <Ionicons name="calendar" size={30} color={"#a9a9a9"} />
                <Text>Calendário</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Mensagens')}>
                <Ionicons name="mail" size={30} color={"#a9a9a9"} />
                <Text>Mensagens</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.icons} onPress={() => navigation.navigate('Profile')}>
                <Ionicons name="person" size={30} color={"#a9a9a9"} />
                <Text>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    icons: {
        alignItems: 'center',
    },
});

export default CustomNavBar;
