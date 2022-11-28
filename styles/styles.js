import { StyleSheet, Platform, Dimensions } from 'react-native';
import Colors from './colors';


export const style = StyleSheet.create({
    container: {
        height: "100%",
        margin: 24
    },
    header: {
        height: "10%",
        marginTop: 24
    },

    menuButton: {
        position: "absolute",
        color: Colors.darkText,
        alignSelf: 'flex-end',
        top: 2
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
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },

    buttonText: {
        color: Colors.lightText,
        fontSize: 20
    },

    // Keltainen ympyrä iconin alla
    iconsEllipse: {
        backgroundColor: Colors.iconsBackground,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 1000,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },

    // Feather icons
    icons: {
        color: Colors.darkText,
        top: 12,
        alignSelf: 'center',
    },

    


    backgroundImage: {
       
    },

    // Ilmoittautumisen, pisteiden syötön ja rankingin vaalea tausta
    viewContainer: {
        backgroundColor: Colors.backgroundColor,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: "90%"
    }, 
    // Listojen ja hakujen tausta
    search: {
        backgroundColor: Colors.inputColor,
        height: 50
    },

    // SplashScreen styles

    // CodeScreen styles

    codeInputs: { // Näihin syötetään koodi, tarvii lisää määrittelyjä vielä
        backgroundColor: Colors.inputColor,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 1000,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 4
    },

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
        flexDirection: "column",
        width: '90%',
        height: 72,
        marginBottom: 15
    },

    // Vain Home sivun keltaiset pallurat
    homeEllipse: {
        //left: 305,
        alignSelf: 'flex-end'
    },

    // EnrolmentScreen styles

    addPlayer: {
        color: Colors.darkText,
        top: 12,
        alignSelf: 'center'
    }, 

    enrolButton: {
        flexDirection: "column",
        width: 230,
        height: 53,
        marginBottom: 35
    },

    predictedRanking: {
        backgroundColor: Colors.inputColor,
        width: "90%",
        alignSelf: 'center',
        justifyContent: 'center',
    },



    // PointsScreen styles

    // RankingScreen styles

    // Menu styles
})