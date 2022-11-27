import { StyleSheet } from "react-native";
const GLOBAL = require('./themes/dark')

export const T = StyleSheet.create({
//  =============================== CONTENT STYLES =============================
  red: {  //Red text - usually means something is missing
    alignSelf: 'center',
    color: 'red',
    fontSize: 15,
  },
  text15: { //Text of size 15
    fontSize: 15,
    color: GLOBAL.THEME.TEXTCOLOR,
  },
  centered: { //Centered text of size 30
    alignSelf: 'center',
    fontSize: 30,
    color: GLOBAL.THEME.TEXTCOLOR,
  },
  centered15: { //Centered text of size 15
    alignSelf: 'center',
    fontSize: 15,
    color: GLOBAL.THEME.TEXTCOLOR,
  },
  centered20: { //Centered text of size 20
    alignSelf: 'center',
    fontSize: 20,
    color: GLOBAL.THEME.TEXTCOLOR,
  },
  centered25: { //Centered text of size 25
    alignSelf: 'center',
    fontSize: 25,
    color: GLOBAL.THEME.TEXTCOLOR,
  },
  centered50: { //Centered text of size 50
    alignSelf: 'center',
    fontSize: 50,
    color: GLOBAL.THEME.TEXTCOLOR,
  },
  paragraph: {  //Used for paragraphs, size 15
    alignSelf: 'center',
    fontSize: 15,
    color: GLOBAL.THEME.TEXTCOLOR,
  },
  copyright: {  //Copyright text
    textAlign: 'center',
    color: GLOBAL.THEME.TEXTCOLOR,
    fontSize: 17,
  },
  specificEventInfo: {  //specificEventInfo text (+10px from left)
    alignSelf: 'center',
    color: GLOBAL.THEME.TEXTCOLOR,
    fontSize: 20,
    left: 10
  },
  margin15: { //Centered text of size 15 with 15 margin
    alignSelf: 'center',
    color: GLOBAL.THEME.TEXTCOLOR,
    fontSize: 15,
    margin: 15
  }
})
