import { StyleSheet, Platform } from 'react-native';


export const style = StyleSheet.create({
    container: {
        backgroundColor: '#F9F9F9',
        flex: 1,
        marginTop: 100 // tämä rivi atm siksi, että näkee kunnolla näytöltä tekstit
    },

    h2Style: {
        color: '#1B1B1B',
        fontSize: 60,
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
        //color: Colors.secondary, ei toimi
        width: 150,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 20
    },

    icons: {
        backgroundColor: '#EEE8A9'
    },
})