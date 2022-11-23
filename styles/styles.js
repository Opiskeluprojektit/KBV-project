import { StyleSheet, Platform } from 'react-native';
import Colors from './colors';

export const style = StyleSheet.create({
    StyleSheet: {
        backgroundColor: '#F9F9F9',
        marginTop: 100 // tämä rivi atm siksi, että näkee kunnolla näytöltä tekstit
    },

    h2Style: {
        color: '#00353D',
        fontSize: 60,
    ...Platform.select({
        ios: {
            color: 'green',
        },
        android: {
            color: 'black',
        }
    })
    },

    h4Style: {
        color: '#00353D',
        fontSize: 34
    },

    titles: {
        color: '#00353D', 
        fontSize: 20
    },

    text: {
        color: '#1B1B1B',
        fontSize: 16
    },

    button: {
        backgroundColor: '#005C70',
        width: 150,
        borderRadius: 15,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: '500'
    },

    icons: {
        backgroundColor: '#EEE8A9'
    },
})