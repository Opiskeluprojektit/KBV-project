import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
    StyleSheet: {
        backgroundColor: '#F9F9F9',
        marginTop: 100 // tämä rivi atm siksi, että näkee kunnolla näytöltä tekstit
    },

    h1Style: {
        color: '#00353D',
        fontSize: 32,
    ...Platform.select({
        ios: {
            color: 'green',
        },
        android: {
            color: 'black',
        }
    })
    },

    h2Style: {
        color: '#00353D',
        // fontSize:
    },

    h3Style: {
        color: '#00353D',
        // fontSize:
    },

    text: {
        color: '#1B1B1B'
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