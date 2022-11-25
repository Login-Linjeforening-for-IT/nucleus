import { StyleSheet } from "react-native";
const GLOBAL = require('../styles/theme');

export const T = StyleSheet.create({
//  =============================== CONTENT STYLES =============================
  red: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 15,
  },
  white: {
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  text15: {
    fontSize: 15,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered: {
    alignSelf: 'center',
    fontSize: 30,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered15: {
    alignSelf: 'center',
    fontSize: 15,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered20: {
    alignSelf: 'center',
    fontSize: 20,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered25: {
    alignSelf: 'center',
    fontSize: 25,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered50: {
    alignSelf: 'center',
    fontSize: 50,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  paragraph: {
    alignSelf: 'center',
    fontSize: 15,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  copyright: {
    textAlign: 'center',
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 17,
  },
  specificEventInfo: {
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 20,
    left: 10
  },
  margin15: {
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 15,
    margin: 15
  }
})