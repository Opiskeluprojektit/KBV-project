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

    // Hamburgermenu icon, koko on: width={42} height={40}, lisättävä erikseen
    menuButton: {
        position: "absolute",
        color: Colors.bodyText,
        alignSelf: 'flex-end',
        top: 2
    },

    //Otsikko Menulle ja screenien otsikoille
    h4Style: { 
        color: Colors.darkText,
        fontSize: 34
    },

    titles: {
        color: Colors.bodyText, 
        fontSize: 20
    },

    text: {
        color: Colors.bodyText,
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
        color: Colors.bodyText,
        top: 12,
        alignSelf: 'center'
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
        height: 50,
        borderRadius: 10
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
        color: Colors.darkText,
        fontSize: 60,
        textAlign: 'left',
        lineHeight: 60,
        marginTop: 20,
        //fontWeight: 500
    },

    homeButtonsContainer: {
        height: "55%"
    },

    homeButtons: {
        flexDirection: "column",
        width: '95%',
        height: 72,
        marginBottom: 15,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60
    },

    // Vain Home sivun keltaiset pallurat
    homeEllipse: {
        alignSelf: 'flex-end',
        right: 8
    },


    // EnrolmentScreen styles

    addPlayer: {
        color: Colors.bodyText,
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
        borderRadius: 10
    },

    // SummaryEnrolmentScreen styles

    // CodeScreen styles

    codeButtons: {
        flexDirection: "column",
        width: '95%',
        height: 72,
        marginBottom: 15,

     },

    // PointsScreen styles

    // RankingScreen styles

    // Menu styles

    menuContainer: {
        backgroundColor: Colors.inputColor
    },

    menuClose: {
        color: Colors.darkText,
        alignSelf: 'flex-end',
        marginBottom: 20,
        marginTop: 20
    },

    menuIcons: {
        color: Colors.darkText
    },

    someIcons: {
        color: Colors.darkText,
        marginRight: 10,
        marginTop: 30
    },

    menuContent: {
        marginBottom: 20
    }
})