import { StyleSheet } from "react-native";
import GreenLight from "../shared/sharedComponents";

export const ES = StyleSheet.create({
    // ============== EVENT AREA  ==============
    view: {
      top: '-2%',
      justifyContent: 'center',
      width: '15%',
      height: '120%',
      backgroundColor: 'red',
      borderRadius: 10,
    },
    view2: {
      left: 2,
      justifyContent: 'center',
      width: '75%',
      height: '100%',
    },
    view3: {
      justifyContent: 'flex-start',
      width: '10%',
      height: '100%',
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
    height: 100,
    width: 100,
  },
  greenLight: {
    top: '12%',
    alignSelf: 'center',
    color: 'white',
  },
  checkContent: {
    left: 2,
    top: '-30%',
    alignSelf: 'center',
    color: 'white',
  },
  eventCard: {
    justifyContent: 'center'
  }
})