import { StyleSheet } from "react-native";
const GLOBAL = require('../styles/theme');

export const Internal = StyleSheet.create({
top: {
  top: 50,
},
text: {
    height: 30,
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 20,
},
creditText: {
    height: 22,
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 20,
},
texth2: {
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 40,
},
bug: {
    height: -25,
    color: GLOBAL.DARK.TEXTCOLOR,
},
bugImage: {
    top: -30,
    alignSelf: 'center',
    height: 120,
    width: 150,
},
makeNotificationImage: {
    top: 20,
    alignSelf: 'center',
    height: 200,
    width: 200,
},
makeNotification: {
    backgroundColor: GLOBAL.DARK.BACKGROUND,
    paddingHorizontal: 20,
},
creditImage: {
    alignSelf: 'center',
    height: 250,
    width: 250
},
button: {
    borderRadius: 40,
    backgroundColor: GLOBAL.DARK.ORANGE,
    marginHorizontal: 108, 
    marginVertical: 6,
},
buttonContent: {
    marginVertical: 10
},
loginView: {
    height: 50,
    alignSelf: 'center',
    flexDirection: 'row'
},
greenLight: {
    left: '14%',
    top: '10%',
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
},
checkContent: {
    left: '25%',
    top: '-55%',
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
},
passLight: {
    left: '14%',
    top: '6.2%',
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
},
passCheck: {
    left: '25%',
    top: '-35%',
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
},
showPassImage: {
    left: '-11%',
    top: '-20%',
    height: 40,
    width: 40,
},
noPassImage: {
    left: '-10%',
    top: '-46.5%',
    height: 40,
    width: 40,
},
});