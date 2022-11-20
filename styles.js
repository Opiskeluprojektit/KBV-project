import {StyleSheet} from 'react-native';

export const android = StyleSheet.create({
    StyleSheet: {
        backgroundColor: '#F9F9F9',
        marginTop: 100
    }, 

    headings: {
        color: '#00353D'
    },

    text: {
        color: '#1B1B1B'
    },

    button: {
        backgroundColor: '#005C70'
    },

    buttonText: {
        color: '#FFFFFF'
    },

    icons: {
        backgroundColor: '#EEE8A9'
    },


});


export const ios = StyleSheet.create({
    StyleSheet: {
        ...android.StyleSheet,
    }, 


    headings: {
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