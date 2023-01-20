import { StyleSheet} from 'react-native';
import Colors from './colors';

export const style = StyleSheet.create({
    container: {
        height: "100%"
    },
    header: {
        height: "10%",
        marginTop: 40,
        marginLeft: 24,
        marginRight: 24
    },

    // Enrolment, points and ranking light background
    viewContainer: {
        backgroundColor: Colors.background,
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

    // Screen headlines
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

    // Button styles 
    button: {
        backgroundColor: Colors.primary,
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
        color: Colors.buttonText,
        fontWeight: '500',
        fontSize: 16
    },

    // Yellow circle for icons
    iconsEllipse: {
        backgroundColor: Colors.secondary,
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
        backgroundColor: Colors.primaryVariant,
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
        //alignSelf: 'center',
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 30
    },

    codeInputBox: {
        backgroundColor: Colors.primaryVariant,
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
        height: '30%',
        width: '100%'
    },

    HomeScreenLogo: {
        backgroundColor: Colors.brandColor,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 1000
    },

    // Title style
    h2Style: {
        color: Colors.darkText,
        fontWeight: '500',
        fontSize: 60,
        textAlign: 'left',
        lineHeight: 60,
        marginLeft: 24,
        marginTop: 24
    },

    // Button styles
    homeButtonsContainer: {
        height: "55%",
        marginLeft: 24,
        marginRight: 42 //oli ennen 24
    },

    homeButtons: {
        width: '95%',
        height: 74,
        marginBottom: 15
    },

    bigButtonText: {
        color: Colors.buttonText,
        fontWeight: '500',
        fontSize: 20
    },

    // Only HomeScreen yellow circles
    homeEllipse: {
        alignSelf: 'flex-end',
        right: -24
    },

    chosenRankingYear: {
        color: Colors.secondaryOnClick,
    },


// EnrolmentScreen styles

    playerSearch: {
        backgroundColor: Colors.secondaryOnClick,
        padding: 15,
        marginVertical: 4,
        marginHorizontal: 10,
        // marginRight: 10,
        // borderColor: "black",
        // borderWidth: 0.2,
        // paddingTop: 10,
        // paddingBottom: 10,
        // paddingLeft: 10,
    },

    addPlayer: {
        flexDirection: "row"
    }, 

    flatList: {
        //flex: 1,
        marginBottom: 10,
        paddingBottom: 100,
    },

    // Button for enrolment
    enrolButton: {
        width: 230,
        height: 56,
        bottom: 0
    },


    // Yellow circle for adding the player
    iconsAddPlayer: {
        backgroundColor: Colors.secondary,
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

    // Not in use right now
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
        backgroundColor: Colors.primaryVariant,
        width: '90%', //ennen oli 80%
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 50,
    },

    modal: {
        margin: 20 //ennen oli 24 (samaan aikaan modalin leveys 80%)
    },

    // Title for summary modal
    modalTitle: {
        color: Colors.darkText,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        marginTop: 34, // Voi vaihtaa 242, jos tarvii testata selaimella
    },
    
    // Styles for predicted ranking element
    predictedRanking: {
        backgroundColor: Colors.primaryVariant,
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
        marginTop: 20,
    },   

    summaryButton: {
        backgroundColor: Colors.primary,
        width: 120,
        height: 50, //oli ennen 40
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
        
    },

// PointsScreen styles

    pointsContainer: {
        backgroundColor: Colors.background,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: "82%"
    }, 

    pointsHeader: {
        height: "10%",
        marginTop: 44,
        marginLeft: 24,
        marginRight: 24
    },
    
    groupSeparator: {
    },

    playerSeparator: {
        paddingTop: 8,
        paddingBottom: 8
    },

    playerContainer: {
        backgroundColor: Colors.primaryVariant,
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center'
    },

    pointTitles: {
        color: Colors.bodyText, 
        fontWeight: '500',
        fontSize: 20,
        marginBottom: 15,
        marginTop: 30
    },

    pointTexts: {
        color: Colors.bodyText,
        fontSize: 16,
        paddingLeft: 15
    },

    numInput: {
        backgroundColor: Colors.primaryVariant,
        width: '26%',
        height: 50,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 30
    },

    rankingNumber: {
        backgroundColor: Colors.primaryVariant,
        width: 50,
        height: 50,
        marginRight: 10,
        marginTop: 5,
        marginBottom: 30,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center'
    },

    numInputText: {
        color: Colors.bodyText,
        fontSize: 16,
        paddingLeft: 10,
        paddingTop: 15
    },

    playerScoresContainer: {
        flexDirection: "row",
        alignItems: "stretch"
    },

// RankingScreen styles
    // Screen hasn't been built yet.

// Menu styles

    menuContainer: {
        backgroundColor: Colors.primaryVariant
    },

    // Menu icons X, arrows and some icons
    menuClose: {
        color: Colors.darkText,
        alignSelf: 'flex-end', 
        margin: 24,
        marginTop: 40
    },

    menuIcons: {
        color: Colors.darkText,
    },

    someIcons: {
        color: Colors.darkText,
        marginRight: 15,
        marginTop: 30,
    },

    // Sign in
    menuContent: {
        color: Colors.darkText,
        fontWeight: '500',
        fontSize: 30,
        marginBottom: 20,
        marginLeft: 24,
        marginRight: 24
    },

    // Admin screen
    adminHeader: {
        textAlign: 'center'
    },

    adminBox: {
        width: "90%",
        height: 70,
        marginLeft: "5%"
    },

    adminSelect: {
        width: "70%",
        marginLeft: "7.5%",
        backgroundColor: "#C4C4C4",
        borderRadius: "5px",
        marginBottom: 4
    },

    datePickerContainer: {
        marginRight: "10%",
        marginLeft: "10%",
        alignItems: 'center'
    },

    
    adminText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 5
    },

    adminDesc: {
        height: 60,
        marginLeft: "5%",
        width: "90%",
        backgroundColor: Colors.primaryVariant
    },

    adminButton: {
        marginTop: "5%"
    }
})