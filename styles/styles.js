import { StyleSheet, Platform } from 'react-native';
import Colors from './colors';


export const style = StyleSheet.create({
    appContainer: {
        backgroundColor: Colors.backgroundColor,
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
        color: Colors.darkHeading,
        fontSize: 34
    },

    titles: {
        color: Colors.darkText, 
        fontSize: 20
    },

    text: {
        color: Colors.darkText,
        fontSize: 16
    },

    button: {
        backgroundColor: Colors.secondary,
        width: 150,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
    },

    buttonText: {
        color: Colors.lightText,
        fontSize: 20
    },

    iconsEllipse: {
        backgroundColor: Colors.iconsBackground,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 1000,
    },

    // SplashScreen styles

    // CodeScreen styles

    // HomeScreen styles

    heading: {
        height: "35%",
        width: "100%"
    },

    h2Style: {
        color: Colors.darkHeading,
        fontSize: 60,
        textAlign: "left"
    },

    homeButtonsContainer: {
        width: "100%",
        height: "55%"
    },

    homeButtons: {
        backgroundColor: Colors.secondary,
        position: "absolute",
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 4
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

    // EnrolmentScreen styles

    // PointsScreen styles

    // RankingScreen styles

    // Menu styles
})