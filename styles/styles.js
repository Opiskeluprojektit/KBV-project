import { StyleSheet, Platform } from 'react-native';
import Colors from './colors';


export const style = StyleSheet.create({
    appContainer: {
        backgroundColor: '#F9F9F9',
        //flex: 1,
        height: "100%",
    },
    container: {
        marginTop: 20,
        marginLeft: 24,
        marginBottom: 24,
        //marginRight: 24
    },
    header: {
        height: "10%",
        width: "100%"
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
        fontWeight: '500',
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

    homeButtons: {
        width: "100%",
        height: "60%"
    },

    signUpButton: {
        width: 165,
        height: 210,
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        backgroundColor: "#005C70"
    },

    pointsButton: {
        position: "absolute",
        width: 165,
        height: 165,
        borderRadius: 10,
        left: 180,
        shadowRadius: 4,
        backgroundColor: "#005C70",
        shadowOpacity: 0.25
    },

    rulesButton: {
        position: "absolute",
        width: 165,
        height: 165,
        borderRadius: 10,
        shadowRadius: 4,
        backgroundColor: "#005C70",
        shadowOpacity: 0.25,
        top: 227
    },

    rankingButton: {
        position: "absolute",
        width: 165,
        height: 210,
        borderRadius: 10,
        left: 180,
        top: 182,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        backgroundColor: "#005C70"
    },

    signUpText: {
        position: "absolute",
        width: "auto",
        height: "auto",
        left: 12,
        right: "auto",
        top: 155,
        bottom: "auto",
        fontSize: 20,
        color: "#FFFFFF"
    },

    pointsText: {
        position: "absolute",
        width: "auto",
        height: "auto",
        right: "auto",
        top: 110,
        left: 12,
        bottom: "auto",
        fontSize: 20,
        color: "#FFFFFF",
    },

    rulesText: {
        position: "absolute",
        width: "auto",
        height: "auto",
        left: 12,
        right: "auto",
        top: 110,
        bottom: "auto",
        fontSize: 20,
        color: "#FFFFFF"
    },

    rankingText: {
        position: "absolute",
        width: "auto",
        height: "auto",
        left: 12,
        right: "auto",
        top: 155,
        bottom: "auto",
        fontSize: 20,
        color: "#FFFFFF"
    },

    homeEllipse: {
        left: 12,
        top: 12
    }
})