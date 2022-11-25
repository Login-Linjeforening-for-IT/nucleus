import { StyleSheet } from "react-native";  //Stylesheet file
const GLOBAL = require('../styles/theme');  //App theme

export const ES = StyleSheet.create({

//========================= EventScreen =========================
  view: { //Left side card view
    top: '-2%',
    justifyContent: 'center',
    width: '15%',
    height: '120%',
    backgroundColor: 'blue', //Needs to be rendered based on event
    borderRadius: 10,
  },
  view2: { //Middle card view
    top: 7.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    left: 10,
    width: '75%',
  },
  view3: { //Right side card view
    width: '10%',
    height: '100%',
  },
  eventBack: { //Card height and direction on eventscreen
    flexDirection: 'row',
    height: 55,
  },
  dayText: { //Eventday text on eventScreen
    left: '15%',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 30,
  },
  monthText: { //Eventmonth text on eventScreen
    top: '-7.5%',
    left: '15%',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 30,
  },
  title: { //Eventname text on eventScreen
    top: -5,
    fontSize: 20,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  loc: { //Eventlocation text on eventScreen
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
  }
})