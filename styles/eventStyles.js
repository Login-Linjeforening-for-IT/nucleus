import { StyleSheet } from "react-native";
import GreenLight from "../shared/sharedComponents";

export const ES = StyleSheet.create({
    // ============== EVENT AREA  ==============
    view: {
      width: '20%',
      height: '100%',
      backgroundColor: 'red'
    },
    view2: {
      width: '70%',
      height: '100%',
      backgroundColor: 'green'
    },
    view3: {
      width: '10%',
      height: '100%',
      backgroundColor: 'blue'
    },
  dayText: {
    left: '15%',
    color: 'white',
    fontSize: 30,
  },
  monthText: {
    top: '-7.5%',
    left: '15%',
    color: 'white',
    fontSize: 30,
  },
  month: {
    color: 'white',
    fontSize: 24
  },
  title: {
    top: -5,
    fontSize: 20,
    color: 'white',
  },
  desc: {
    color: 'white',
  },
  loc: {
    top: -5,
    fontSize: 20,
    color: 'white',
  },
  time: {
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
    flexDirection: 'row',
    height: 55,
  },
  check: {
    flexDirection: 'row',
    top: '-20%',
    borderRadius: 10,
    backgroundColor: 'green',
    height: 100,
    width: 100,
  },
  greenLight: {
    color: 'white',
  },
  checkContent: {
    color: 'white',
  },
})