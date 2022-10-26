import { StyleSheet } from "react-native";

export const MS = StyleSheet.create ({
//  ========================= STYLESHEET TOP MENU =========================
  top: {
    flex: 2.5,
    backgroundColor: '#181818',
  },
  tMenuL: {
    position: 'absolute',
    top: 45,
    left: 20,
    width: 45,
    height: 45
  },
  goBack: {
    position: 'absolute',
    top: 45,
    left: 10,
    width: 45,
    height: 45
  },
  goBack2: {
    position: 'absolute',
    top: 45,
    left: -10,
    width: 45,
    height: 45
  },
  goBackContent: {
    top: 45,
    left: 10,
    width: 45,
    height: 45
  },
  tMenuR: {
    position: 'absolute',
    top: 18,
    right: -5,
    width: 100,
    height: 100
  },
  smallLogo: {
    width: 26,
    height: 26,
  },
  
//  ========================= STYLESHEET BOTTOM MENU =========================
    bMenuUniversal: {
        flex: 2,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bMenu1: {
        position: 'absolute',
        bottom: -42,
        right: -175,
        width: 100,
        height: 100
    },
    bMenu2: {
        position: 'absolute',
        bottom: -40,
        left: -50,
        width: 100,
        height: 100
    },
    bMenu3: {
        position: 'absolute',
        bottom: -40,
        left: -175,
        width: 100,
        height: 100
    },
    settingsSelected: {
        position: 'absolute',
        bottom: 2,
        left: 275,
        width: 100,
        height: 100
    },
    settingsMenuIcon: {
        position: 'absolute',
        bottom: -6,
        left: 150,
        width: 100,
        height: 100
    },
    bMenu2selected: {
        position: 'absolute',
        bottom: -2,
        width: 100,
        height: 100
    },
    homeSelected: {
        position: 'absolute',
        bottom: 0,
        right: 275,
        width: 100,
        height: 100
    },
});