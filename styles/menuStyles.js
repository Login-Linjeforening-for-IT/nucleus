import { StyleSheet } from "react-native";  //Stylesheet file
const GLOBAL = require('./themes/dark')

export const MS = StyleSheet.create ({
//  ========================= STYLESHEET TOP MENU =========================
  screenTitle: { //Header title of every page
    top: '12%',
    color: GLOBAL.DARK.TITLETEXTCOLOR, //Maybe buttons are clickable if not percentage value?
    fontSize: 35,
  },
  smallTitle: { //Header title of every page
    maxWidth: 200,
    left: 15,
    top: '12%',
    color: GLOBAL.DARK.TITLETEXTCOLOR, //Maybe buttons are clickable if not percentage value?
    fontSize: 20,
  },
  topMenu: {  //Top menu background view
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '12%',
    backgroundColor: GLOBAL.DARK.DARKER,
  },
  tMenuIcon: {  //Size of icons
    top: '5%',
    width: 120,
    height: 120
  },
  tMenuIconWithExtra: {  //Placement when extra icons are added
    right: '70%',
    top: '5%',
    width: 50,
    height: 120
  },
  goBack: {   //Size of goBack icon 
    top: '25%',
    left: '-10%',
    width: 80,
    height: 80,
  },
  searchIcon: {  //Size of icons
    right: 18,
    top: '45%',
    width: 36,
    height: 40
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