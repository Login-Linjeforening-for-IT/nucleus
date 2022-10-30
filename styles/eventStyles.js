import { StyleSheet } from "react-native";
import GreenLight from "../shared/sharedComponents";

export const ES = StyleSheet.create({
    // ============== EVENT AREA  ==============
  day: {
    flexDirection: 'column',
    top: '-20%',
    borderRadius: 10,
    backgroundColor: '#d62f42',
    height: 70,
    width: 50,
  },
  dayText: {
    flexDirection: 'row',
    left: '15%',
    color: 'white',
    fontSize: 30,
  },
  monthText: {
    flexDirection: 'row',
    top: '-7.5%',
    left: '15%',
    color: 'white',
    fontSize: 30,
  },
  month: {
    flexDirection: 'row',
    color: 'white',
    fontSize: 24
  },
  title: {
    flexDirection: 'row',
    top: -37,
    fontSize: 20,
    left: 30,
    color: 'white',
  },
  desc: {
    flexDirection: 'row',
    color: 'white',
  },
  loc: {
    flexDirection: 'row',
    top: -32,
    fontSize: 20,
    left: 30,
    color: 'white',
  },
  time: {
    flexDirection: 'row',
    color: 'white',
  },
  headerTitle: {
    flexDirection: 'row'
  },
  headerImage: {
    flexDirection: 'row',
    color: 'white',
    backgroundColor: '#777',
  },
  eventBack: {
    height: 25,
  },
  greenLight: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  check: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
  }
})