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
        fontSize: 16
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
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10
    },

// CodeScreen styles

    bigLogo: {
        width: 150,
        height: 150,
        marginTop: 120,
        marginBottom: 50,
        alignSelf: 'center'
    },

    codeInputField: {
        alignSelf: 'center',
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

    codeContainer: {
        height: "55%",
        alignSelf: 'center'
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
        width: '95%',
        height: 74,
        marginBottom: 15
    },

    bigButtonText: {
        color: Colors.lightText,
        fontWeight: '500',
        fontSize: 20
    },

    // Only HomeScreen yellow circles
    homeEllipse: {
        alignSelf: 'flex-end',
        //right: 8
        right: -24
    },


// EnrolmentScreen styles

    playerSearch: {
        marginBottom: 5
    },

    addPlayer: {
        flexDirection: "row",
        //marginBottom: 24
    }, 

    // Button for enrolment
    enrolButton: {
        width: 230,
        height: 56,
        bottom: 0
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
        shadowRadius: 4
    },

    addPlayerText: {
        textAlignVertical: 'center',
        textAlign: 'left',
        fontSize: 20,
        letterSpacing: 0.1,
        fontWeight: '500'
    },

// SummaryEnrolmentModal styles
    
    //Title for summary enrolment modal
    summaryTitle: {
        color: Colors.darkText, 
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 10
    },

    // Enrolment details
    summaryDetails: {
        flexDirection: 'row',
        marginBottom: 10
    },
    
    // Container for summary modal
    modalContainer: {
        backgroundColor: Colors.inputColor,
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 50,
    },

    modal: {
        left: 24,
        marginTop: 42,
    },

    // Title for summary modal
    modalTitle: {
        color: Colors.darkText,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 242, // vaihdetaan 34, kunhan marginin testaus lopetettu
    },
    
    // Styles for predicted ranking element
    predictedRanking: {
        backgroundColor: Colors.inputColor,
        width: "90%",
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },

    // Icons for enrolled players, date and time
    summaryIcons: {
        color: Colors.bodyText,
        marginRight: 20
    }, 

    // Modal button styles
    buttonSummaryStyles: {
        flexDirection: "row",
    },   

    summaryButton: {
        backgroundColor: Colors.secondary,
        width: 120,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginBottom: 34
    },

// PointsScreen styles
    
    groupSeparator: {
    },

    playerSeparator: {
        paddingTop: 8,
        paddingBottom: 8
    },

    playerContainer: {
        backgroundColor: Colors.inputColor,
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 10,
        justifyContent: 'center'
    },

    pointTitles: {
        color: Colors.bodyText, 
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 10,
        marginTop: 30,
        alignSelf: 'center'
    },

    pointTexts: {
        color: Colors.bodyText,
        fontSize: 16,
        paddingLeft: 15
    },

    numInput: {
        backgroundColor: Colors.inputColor,
        width: '31%',
        height: 50,
        marginRight: 13,
        marginBottom: 13,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },

    playerScoresContainer: {
        flexDirection: "row",
        alignItems: "stretch"
    },

// RankingScreen styles
    // Screen hasn't been built yet.

// Menu styles

    menuContainer: {
        backgroundColor: Colors.inputColor
    },

    menuClose: {
        color: Colors.darkText,
        alignSelf: 'flex-end',
        margin: 24,
        marginTop: 34
    },

    menuIcons: {
        color: Colors.darkText,
    },

    someIcons: {
        color: Colors.darkText,
        marginRight: 15,
        marginTop: 30,
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