import { StyleSheet } from "react-native";  //Stylesheet file
const GLOBAL = require('./themes/dark')
export const ES = StyleSheet.create({

//========================= EventScreen =========================
  view: { //Left side card view
    top: '-2%',
    justifyContent: 'center',
    height: '120%',
    borderRadius: 10,
  },
  view2: { //Middle card view
    top: 7.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    left: 10,
    width: '70%',
  },
  view3: { //Right side card view
    position: 'absolute',
    right: 0,
    height: '100%',
  },
  eventBack: { //Card height and direction on eventscreen
    flexDirection: 'row',
    height: 55,
  },
  dayText: { //Eventday text on specificEventScreen
    left: '20%',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 30,
  },
  monthText: { //Eventmonth text on specificEventScreen
    alignSelf: 'flex-start',
    top: '-7.5%',
    left: '20%',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 20,
  },
  eventCardDayText: { //Eventday text on eventScreen
    left: '15%',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 30,
  },
  eventCardMonthText: { //Eventmonth text on eventScreen
    alignSelf: 'flex-start',
    top: '-7.5%',
    left: '15%',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 20,
  },
  title: { //Eventname text on eventScreen
    left: 5,
    top: -5,
    fontSize: 20,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  loc: { //Eventlocation text on eventScreen
    left: 5,
    top: -5,
    fontSize: 20,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  greenLight: { //Position of checklight on eventScreen
    top: '12%',
    alignSelf: 'center',
  },
  checkContent: { //Renders the check icon itself
    left: 2,
    top: '-30%',
    alignSelf: 'center',
  },
//======================== SpecificEventScreen ===================
  specificEventInfoView: { //Layout for specificEventScreen
    flexDirection: 'row',
    alignItems: 'center'
  },
  specificEventView1: { //Layout for the image on specificEventView
    alignItems: 'center',
    height: '10%',
  },
  specificEventImage: { //The header image on specificEventScreen
    height: '100%',
  },
//======================== EventComponentStyles ===================
  size: { //Middle sized icons
    height: 40,
    width: 40
},
smallSize: { //Small icons
    height: 20,
    width: 20
},
eventLight: { //Position of specific event color circle
    top: -10,
    height: 0,
    width: 10,
},
specificEventLight: { //Position of specific event color circle
  left: 8,
  height: 20,
  width: 20,
},
card: {
  borderRadius: 20,
  backgroundColor: GLOBAL.DARK.DARKER,
  marginHorizontal: 10,
  marginTop: 10,
},
cardContent: {
  marginHorizontal: 18,
  marginVertical: 18
},
cardSmaller: {
  marginHorizontal: 10,
  borderRadius: 20,
  backgroundColor: GLOBAL.DARK.DARKER,
},
size: {
  height: 40,
  width: 40
},
smallSize: {
  height: 20,
  width: 20
},
specificEventLight: {
  left: 8,
  height: 20,
  width: 20
},
filterText: {  //eventScreen filter text
  backgroundColor: GLOBAL.DARK.DARKER,
  alignSelf: 'center',
  alignItems: 'center',
  marginTop: 10,
  width: '95%',
  marginHorizontal: 10,
  height: 50,
  borderRadius: 15,
  color: 'white',
},
})