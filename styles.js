import {StyleSheet, Platform} from 'react-native';

// Style for Android
export const android = StyleSheet.create({
    StyleSheet: {
        backgroundColor: '#F9F9F9',
        marginTop: 100 // tämä rivi atm siksi, että näkee kunnolla näytöltä tekstit
    }, 

    h1Style: {
        color: '#00353D',
        fontSize: 32
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


});


// Style for ios
export const ios = StyleSheet.create({
    StyleSheet: {
        ...android.StyleSheet,
    }, 

    h1Style: {
        ...android.StyleSheet,
    },

    h2Style: {
        ...android.StyleSheet,
    },

    h3Style: {
        ...android.StyleSheet,
    },

    text: {
        ...android.StyleSheet,
    },

    button: {
        ...android.StyleSheet,
    },

    buttonText: {
        ...android.StyleSheet,
    },

    icons: {
        ...android.StyleSheet,
    },
    
});