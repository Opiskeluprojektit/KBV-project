import { StyleSheet, Platform } from 'react-native';
import Colors from './colors';


export const style = StyleSheet.create({
    container: {
        height: "100%",
        margin: 24
    },
    header: {
        height: "10%",
        width: "100%"
    },

    //Otsikko Menulle ja "kiitos ilmoittautumisesta"
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

    // Keltainen ympyrä vasemmassa reunassa
    iconsEllipse: {
        backgroundColor: Colors.iconsBackground,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 1000,
    },

    // Feather icons
    icons: {
        color: Colors.darkText,
        top: 12,
        alignSelf: 'center'
    },

    backgroundImage: {
       
    },

    // SplashScreen styles

    // CodeScreen styles

    // HomeScreen styles

    heading: {
        height: '30%',
        width: '100%'
    },

    HomeScreenLogo: {
        backgroundColor: Colors.primary,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 1000
    },

    h2Style: {
        color: Colors.darkHeading,
        fontSize: 60,
        textAlign: 'left',
        lineHeight: 60,
        marginTop: 20,
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
        alignSelf: 'start', // tai center
        justifyContent: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        flexDirection: "column",
        width: '90%',
        height: 74,
        marginBottom: 15
    },

    homeEllipse: {
        left: 305
    },

    // EnrolmentScreen styles

    enrolButton: {
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        flexDirection: "column",
        width: 230,
        height: 53,
        marginBottom: 15
    },


    // PointsScreen styles

    // RankingScreen styles

    // Menu styles
})