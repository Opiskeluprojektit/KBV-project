import { StyleSheet} from 'react-native';
import Colors from './colors';

export const style = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        height: "10%",
        marginTop: 34,
        marginLeft: 24,
        marginRight: 24
    },

    // Enrolment, points and ranking light background
    viewContainer: {
        backgroundColor: Colors.backgroundColor,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: "90%"
    }, 

    // Enrolment, points and ranking light background
    contentOnLightBG: {
        marginLeft: 24,
        marginRight: 24
    },

    // Hamburgermenu icon, size is: width={42} height={40}
    menuButton: {
        position: "absolute",
        color: Colors.bodyText,
        alignSelf: 'flex-end',
        top: 2
    },

    //Screen headerlines
    h4Style: { 
        color: Colors.darkText,
        fontWeight: '500',
        fontSize: 34,
        marginTop: 34,
        marginBottom: 30
    },

    titles: {
        color: Colors.bodyText, 
        fontWeight: '500',
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
        fontWeight: '500',
        fontSize: 20
    },

    // Yellow circle for icons
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


    // List and search background
    search: {
        backgroundColor: Colors.inputColor,
        height: 50,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    // SplashScreen styles

    // CodeScreen styles

    bigLogo: {
        width: 150,
        height: 150,
        marginTop: 120,
        marginBottom: 50,
        alignSelf: 'center'
    },

    codeContainer: {
        height: "55%",
        marginLeft: 24,
        marginRight: 24,
        alignSelf: 'center'
    },

    codeButtons: {
        flexDirection: 'column',
        width: '90%',
        height: 60
    },

    codeInputField: {
        alignItems: 'center',
        //alignSelf: 'center',
        marginBottom: 30,
    },

    codeInputBox: {
        backgroundColor: Colors.inputColor,
        color: Colors.bodyText,
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
        height: '35%',
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
        fontWeight: '500',
        fontSize: 60,
        textAlign: 'left',
        lineHeight: 60,
        marginLeft: 24,
        marginTop: 24
    },

    homeButtonsContainer: {
        height: "50%",
        marginLeft: 24,
        marginRight: 24
    },

    homeButtons: {
        flexDirection: "column",
        width: '100%',
        height: 72,
        marginBottom: 15,
        borderTopRightRadius: 60,
        borderBottomRightRadius: 60
    },

    // Only HomeScreen yellow circles
    homeEllipse: {
        alignSelf: 'flex-end',
        right: 8
    },


// EnrolmentScreen styles

    addPlayer: {
        flexDirection: "row",
        //marginBottom: 24
    }, 

    // Button for enrolment
    enrolButton: {
        //flexDirection: 'column',
        //position: 'absolute',
        width: 230,
        height: 53,
        bottom: 0
    },

    // Styles for predicted ranking element
    predictedRanking: {
        backgroundColor: Colors.inputColor,
        width: "90%",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },

    // Yellow circle for adding the player
    iconsAddPlayer: {
        backgroundColor: Colors.iconsBackground,
        width: 50,
        height: 50,
        borderRadius: 1000,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        //position: 'absolute'
        //overflow: 'hidden'
    },

    addPlayerText: {
        textAlignVertical: 'center',
        textAlign: 'left',
        fontSize: 20,
        letterSpacing: 0.1,
        fontWeight: '500', // pitäskö tämä olla myös titles'issä
    },

// SummaryEnrolmentScreen styles

    // Container / modal container for summary screen
    summaryContainer: {
        margin: 24
    },

    // Heading only for enrolment
    summaryHeading: { 
        color: Colors.darkText,
        fontWeight: '500',
        fontSize: 40,
        marginTop: 34,
        marginBottom: 15
    },

    summaryTitle: {
        color: Colors.darkText, 
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 10
    },

    summaryDetails: {
        flexDirection: 'row',
        marginBottom: 10
    },

    // Icons for enrolled players, date and time
    summaryIcons: {
        color: Colors.bodyText,
        marginRight: 20
    }, 

    iconsClose: {
        backgroundColor: Colors.iconsBackground,
        alignSelf: 'flex-end',
        marginLeft: 24,
        width: 50,
        height: 50,
        borderRadius: 1000,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    // PointsScreen styles
    divisionSeparator: {
        height: 8,
    },

    // RankingScreen styles

    // Menu styles

    menuContainer: {
        backgroundColor: Colors.inputColor
    },

    menuClose: {
        color: Colors.darkText,
        alignSelf: 'flex-end',
        margin: 24
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
        color: Colors.darkText,
        fontWeight: '500',
        fontSize: 34,
        marginBottom: 20,
        marginLeft: 24,
        marginRight: 24
    }
})