import { StyleSheet } from "react-native";
const GLOBAL = require('../styles/theme');

export const ES = StyleSheet.create({
  specificEventInfoView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  specificEventView1: {
    alignItems: 'center',
    height: '10%',
  },
  view: {
    top: '-2%',
    justifyContent: 'center',
    width: '15%',
    height: '120%',
    backgroundColor: 'blue', //Needs to be rendered based on event
    borderRadius: 10,
  },
  view2: {
    top: 7.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    left: 10,
    width: '75%',
  },
  view3: {
    width: '10%',
    height: '100%',
  },
  dayText: {
    left: '15%',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 30,
  },
  monthText: {
    top: '-7.5%',
    left: '15%',
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 30,
  },
  month: {
    color: GLOBAL.DARK.TEXTCOLOR,
    fontSize: 24
  },
  title: {
    top: -5,
    fontSize: 20,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  desc: {
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  loc: {
    top: -5,
    fontSize: 20,
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  time: {
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  headerTitle: {
    flexDirection: 'row'
  },
  eventBack: {
    flexDirection: 'row',
    height: 55,
  },
  check: {
    flexDirection: 'row',
    height: 100,
    width: 100,
  },
  greenLight: {
    top: '12%',
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  checkContent: {
    left: 2,
    top: '-30%',
    alignSelf: 'center',
    color: GLOBAL.DARK.TEXTCOLOR,
  },
  specificEventImage: {
    height: '100%',
  }
})