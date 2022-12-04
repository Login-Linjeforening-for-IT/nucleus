import { StyleSheet } from "react-native";
const GLOBAL = require('./themes/dark')

export const T = StyleSheet.create({
//  =============================== CONTENT STYLES =============================
  red: {  //Red text - usually means something is missing
    alignSelf: 'center',
    color: 'red',
    fontSize: 15,
  },
  locationError: {  //Red text - usually means something is missing
    top: 2,
    left: 8,
    alignSelf: 'center',
    color: 'red',
    fontSize: 15,
  },
  text15: { //Text of size 15
    fontSize: 15,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  text40: { //Text of size 40
    fontSize: 40,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  text30: { //Text of size 30
    fontSize: 30,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  text20: { //Text of size 20
    fontSize: 20,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered: { //Centered text of size 30
    alignSelf: 'center',
    fontSize: 30,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centeredOppositeColor: { //Centered text of size 30
    alignSelf: 'center',
    fontSize: 30,
    color: GLOBAL.DARK.OPPOSITETEXTCOLOR,
  },
  centered15: { //Centered text of size 15
    alignSelf: 'center',
    fontSize: 15,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered20: { //Centered text of size 20
    alignSelf: 'center',
    fontSize: 20,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered25: { //Centered text of size 25
    alignSelf: 'center',
    fontSize: 25,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  centered50: { //Centered text of size 50
    alignSelf: 'center',
    fontSize: 50,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  paragraph: {  //Used for paragraphs, size 15
    alignSelf: 'center',
    fontSize: 15,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  copyright: {  //Copyright text
    textAlign: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 17,
  },
  specificEventInfo: {  //specificEventInfo text (+10px from left)
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 20,
    left: 10
  },
  margin15: { //Centered text of size 15 with 15 margin
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 15,
    margin: 15
  }, 
  filterCategoryText: {
    left: 10,
    color: GLOBAL.DARK.TITLETEXTCOLOR,
  },
  actualCategoryText: {
    color: GLOBAL.DARK.TEXTCOLOR,
  }
})
