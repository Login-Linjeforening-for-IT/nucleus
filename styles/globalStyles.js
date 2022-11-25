import { StyleSheet } from "react-native";
const GLOBAL = require('../styles/theme');

export const GS = StyleSheet.create({
  content: {
  height: '75%',
  backgroundColor: GLOBAL.DARK.BACKGROUND,
  paddingHorizontal: 20,
  },
  creditContent: {
    top: '-2.5%',
    height: '75%',
    backgroundColor: GLOBAL.DARK.BACKGROUND,
    paddingHorizontal: 20,
  },
  creditImage: {
    bottom: '10%',
    alignSelf: 'center',
    height: 105,
    width: 200,
  },
  inputText: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 40,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  reportInputContentText: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: '90%',
    borderRadius: 40,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  notificationBack: {
    flexDirection: 'row',
    height: 25,
  },
  notificationText: {
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 20
  },
  view: {
    alignSelf: 'center',
    width: '85%',
  },
  view2: {
    justifyContent: 'center',
  },
  inputText: {
    backgroundColor: GLOBAL.DARK.DARKER,
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 40,
    color: 'white',
  },
});