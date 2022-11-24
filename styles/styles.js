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
        justifyContent: 'center',
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

    icons: {
        color: Colors.darkText,
        position: "absolute",
        left: 15,
        top: 10,
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
        textAlign: "left",
        lineHeight: 60,
        marginTop: 30,
        //fontWeight: 500
    },

    homeButtonsContainer: {
        width: "100%",
        height: "55%"
    },

    homeButtons: {
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        flexDirection: "column",
        width: 330,
        height: 76,
        marginBottom: 15
    },

    homeEllipse: {
        left: 305
    }

    // EnrolmentScreen styles

    // PointsScreen styles

    // RankingScreen styles

    // Menu styles
})