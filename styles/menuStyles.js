import { StyleSheet } from "react-native";

export const MS = StyleSheet.create ({
//  ========================= STYLESHEET TOP MENU =========================
  backGround: {
    height: '100%',
    backgroundColor: '#181818'
  },
  topMenu: {  
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '15%',
    backgroundColor: '#181818',
  },
  tMenuL: {
    top: '10%',
    left: '-10%',
    width: 120,
    height: 120
  },
  goBack: {
    top: '25%',
    left: '-10%',
    width: 80,
    height: 80
  },
  goBackContent: {
    width: 45,
    height: 45
  },
  tMenuR: {
    top: '10%',
    left: '10%',
    width: 120,
    height: 120
  },
  
//  ========================= STYLESHEET BOTTOM MENU =========================
    bMenuUniversal: {
        height: '10%',
        backgroundColor: '#121212',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bMenuWhenNoTop: {
      height: '10%',
      backgroundColor: '#121212',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
    bMenu1: {
      bottom: '10%',
      width: 120,
      height: 120
    },
    bMenu2: {
      bottom: '10%',
      width: 120,
      height: 120
    },
    bMenu3: {
      bottom: '10%',
      width: 120,
      height: 120
    },
    settingsSelected: {
      bottom: '10%',
      width: 120,
      height: 120
    },
    eventSelected: {
      bottom: '10%',
      width: 120,
      height: 120
    },
    homeSelected: {
      bottom: '10%',
      width: 120,
      height: 120
    },
});