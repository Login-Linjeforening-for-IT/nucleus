import { StyleSheet } from "react-native";  //Stylesheet file
const GLOBAL = require('../styles/theme');  //App theme

export const MS = StyleSheet.create ({
//  ========================= STYLESHEET TOP MENU =========================
  screenTitle: { //Header title of every page
    top: '14.5%',
    color: GLOBAL.DARK.TITLETEXTCOLOR,
    fontSize: 35,
  },
  topMenu: {  //Top menu background view
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '15%',
    backgroundColor: GLOBAL.DARK.DARKER,
  },
  tMenuIcons: { //Right side icons
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tMenuIcon: {  //Size of icons
    top: '10%',
    width: 120,
    height: 120
  },
  goBack: {   //Size of goBack icon 
    top: '25%',
    left: '-10%',
    width: 80,
    height: 80
  },
  
//  ========================= STYLESHEET BOTTOM MENU =========================
    bMenu: { //Bottom menu background view
        height: '10%',
        backgroundColor: GLOBAL.DARK.DARKER,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bMenuIcon: {  //Icons in bottom menu
      bottom: '10%',
      width: 120,
      height: 120
    },
});