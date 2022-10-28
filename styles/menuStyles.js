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
    left: '-10%',
    width: 120,
    height: 120
  },
  goBack: {
    left: '-20%',
    width: 120,
    height: 120
  },
  goBackContent: {
    width: 45,
    height: 45
  },
  tMenuR: {
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
      width: 120,
      height: 120
    },
    bMenu2: {
      width: 120,
      height: 120
    },
    bMenu3: {
      width: 120,
      height: 120
    },
    settingsSelected: {
      width: 120,
      height: 120
    },
    eventSelected: {
      width: 120,
      height: 120
    },
    homeSelected: {
      width: 120,
      height: 120
    },
});