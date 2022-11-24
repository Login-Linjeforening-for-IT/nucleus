import { StyleSheet } from "react-native";

export const MS = StyleSheet.create ({
//  ========================= STYLESHEET TOP MENU =========================
  screenTitle: {
    top: '14.5%',
    color: '#777',
    fontSize: 35,
  },
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
  tMenuIcons: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tMenuL: {
    top: '10%',
    width: 120,
    height: 120
  },
  tMenuC: {
    alignSelf: 'center',
    top: '10%',
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
    left: '-70%',
    top: '5%',
    width: 120,
    height: 120
  },
  tMenuR2: {
    left: '-20%',
    top: '5%',
    width: 120,
    height: 120
  },
  tMenuR3: {
    color: '#777',
    fontSize: 35,
    left: '65%',
    top: '37.5%',
    width: 120,
    height: 120
  },
  tMenu2R: {
    left: '-36.75%',
    top: '5%',
    width: 120,
    height: 120
  },
  tMenu2R2: {
    left: '13.25%',
    top: '5%',
    width: 120,
    height: 120
  },
  tMenu2R3: {
    color: '#777',
    fontSize: 35,
    left: '98.25%',
    top: '37.5%',
    width: 120,
    height: 120
  },
  logo: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#999',
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