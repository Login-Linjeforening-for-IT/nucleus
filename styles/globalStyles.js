import { StyleSheet } from "react-native";  //Stylesheet file
const GLOBAL = require('./themes/dark')

export const GS = StyleSheet.create({
//========================= EventScreen =========================
  content: { //Main view of every screen
  height: '75%',
  backgroundColor: GLOBAL.THEME.BACKGROUND,
  paddingHorizontal: 20,
  },
  reportInputContentText: { //reportScreen description text
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: '90%',
    borderRadius: 40,
    color: GLOBAL.THEME.TEXTCOLOR,
  },
  notificationBack: { //The horizontal card views on notificationScreen
    flexDirection: 'row',
    height: 25,
  },
  notificationText: { //The text on notificationScreen
    color: GLOBAL.THEME.TEXTCOLOR,
    fontSize: 20
  },
  inputText: {  //reportScreen name and notifier text
    backgroundColor: GLOBAL.THEME.DARKER,
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 40,
    color: 'white',
  },
  view: { //Left view of notificationScreen
    alignSelf: 'center',
    width: '85%',
  },
  view2: { //Right view of notificationScreen
    justifyContent: 'center',
  },
  smallImage: { //Used anywhere there is a small image
    top: -30,
    alignSelf: 'center',
    height: 120,
    width: 150,
},
});