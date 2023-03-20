import { StyleSheet } from "react-native";

export const SS = StyleSheet.create ({
    lightSwitchImage: {                 // lightSwitchImage in notificationScreen
        left: '-27.5%',
        width: 120,
        height: 120
    },
    langSwitch: {                       // langSwitch text style in notificationScreen
        left: 12.5,
        fontSize: 20,
    },
    button: {                           // Report button on reportScreen
        borderRadius: 40,
        marginHorizontal: 108, 
        marginVertical: 6,
    },
    notifyButton: {                     // Notifybutton in sharedComponents
        alignSelf: 'center',            
        width: 200,
        borderRadius: 40,
        backgroundColor: 'red',
        marginHorizontal: 108, 
        marginVertical: 6,
    },
    buttonContent: {                    // Button margin 
        marginVertical: 10
    },
    reportContentView: {                // Secures the dimensions of the reportViews
        height: 200,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    greenLight: {                       // Light position on loginScreen
        left: '14%',
        top: '10%',
        alignSelf: 'center',
    },
    checkContent: {                     // Check position on loginScreen
        left: '25%',
        top: '-55%',
        alignSelf: 'center',
    },
    reportGreenLight: {                 // Light position on reportScreen
        left: '14%',
        top: '40%',
        alignSelf: 'center',
    },
    reportCheckContent: {               // Check position on reportScreen
        left: '25%',
        top: '23%',
        alignSelf: 'center',
    },
    passLight: {                        // PassLight position on reportScreen
        left: '14%',
        top: '6.2%',
        alignSelf: 'center',
    },
    passCheck: {                        // PassCheckIcon position on reportScreen
        left: '25%',
        top: '-35%',
        alignSelf: 'center',
    },
    showPassImage: {                    // ShowPassIcon position on reportScreen
        left: '-11%',
        top: '-20%',
        height: 40,
        width: 40,
    },
    noPassImage: {                      // PassIcon position on reportScreen
        left: '-10%',
        top: '-46.5%',
        height: 40,
        width: 40,
    },
    noPassLight: {                      // PassLight position on reportScreen
        left: '14%',
        top: '10%',
        alignSelf: 'center',
    },
    noPassCheck: {                      // PassCheck position on reportScreen
        left: '25%',
        top: '-35%',
        alignSelf: 'center',
    },
    loginView: {                        // Views on login screen
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row'
    },
});