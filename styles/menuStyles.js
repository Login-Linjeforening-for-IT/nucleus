import { StyleSheet } from "react-native";  //Stylesheet file

export const MS = StyleSheet.create ({
//  ========================= STYLESHEET TOP MENU =========================
  screenTitle: {
    textAlign: 'center',
    top: '11.5%',
    fontSize: 35,
  },
  smallTitle: { //Header title of every page
    maxWidth: 190,
    left: 15,
    top: '12%',
    fontSize: 20,
  },
  topMenu: {  //Top menu background view
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '12%',
  },
  tMenuIcon: {  //Size of icons
    top: '5%',
    width: 100,
    height: 120
  },
  tMenuIconWithExtra: {  //Placement when extra icons are added
    right: '50%',
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
    right: 14,
    top: '47.5%',
    width: 32,
    height: 40
  },
  
//  ========================= STYLESHEET BOTTOM MENU =========================
  bMenu: { //Bottom menu background view
      height: '10%',
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