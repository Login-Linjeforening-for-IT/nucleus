import { StyleSheet } from "react-native";  //Stylesheet file
import { Dimensions } from "react-native";

export const MS = StyleSheet.create ({
//  ========================= STYLESHEET TOP MENU =========================
  screenTitle: {
    textAlign: 'center',
    marginTop: Dimensions.get('window').height/30,
    alignSelf: 'center',
    fontSize: 35,
  },
  smallTitle: { //Header title of every page
    textAlign: 'center',
    marginTop: Dimensions.get('window').height/30,
    alignSelf: 'center',
    fontSize: 25,
  },
  smallMultilineTitle: { //Header title of every page
    maxWidth: 190,
    left: 15,
    alignSelf: 'flex-end',
    marginBottom: Dimensions.get('window').height/50,
    fontSize: 20,
  },
  topMenu: {  //Top menu background view
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height/7.5,
  },
  tMenuIcon: {  //Size of icons
    top: '5%',
    width: 100,
    height: 120
  },
  tMenuIconWithExtra: {  //Placement when extra icons are added
    right: '50%',
    top: 5,
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
    top: '6%',
    right: 10,
    width: 30,
    height: 120
  },
  
//  ========================= STYLESHEET BOTTOM MENU =========================
  bMenu: { //Bottom menu background view
      height: Dimensions.get('window').height/10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
  },
  bMenuIcon: {  //Icons in bottom menu
    bottom: '13%',
    width: 120,
    height: 120
  },
});