import { StyleSheet, Platform } from 'react-native';
import { Colors } from './colors';


export const style = StyleSheet.create({
    appContainer: {
        backgroundColor: '#F9F9F9',
        //flex: 1,
        height: "100%",
    },
    container: {
        marginTop: 10,
        marginLeft: 24,
        marginBottom: 24,
        marginRight: 24
    },
    header: {
        height: "10%",
        width: "100%",
        backgroundColor: 'tomato' // poista myöhemmin
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
        //color: Colors.secondary,
        width: 150,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 20
    },

    iconsEllipse: {
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 1000,
        backgroundColor: "#EEE8A9"
    },

    // HomeScreen styles

    heading: {
        //height: "30%",
        width: "100%"
    },

    h2Style: {
        color: '#00353D',
        fontSize: 60,
        textAlign: "left"
    },

    homeButtonsContainer: {
        width: "100%",
        height: "60%"
    },

    homeButtons: {
        position: "absolute",
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        backgroundColor: "#005C70"
    },

    signUpButton: {
        width: 165,
        height: 210
    },

    pointsButton: {
        width: 165,
        height: 165,
        left: 180
    },

    rulesButton: {
        width: 165,
        height: 165,
        top: 227
    },

    rankingButton: {
        width: 165,
        height: 210,
        left: 180,
        top: 182
    },

    bigButtonText: {
        left: 12,
        top: 155
    },

    smallButtonText: {
        top: 110,
        left: 12
    },

    homeEllipse: {
        left: 12,
        top: 12
    }
})