import { StyleSheet } from "react-native";

export const ES = StyleSheet.create({
  specificEventInfoView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  specificEventParentView: {
    flex: 1,
    flexDirection: 'column',
  },
  specificEventView1: {
    alignItems: 'center',
    width: '100%',
    height: '10%',
  },
  specificEventView2: {
    width: '100%',
    height: '8.4%',
    backgroundColor: '#111',
    borderRadius: 20
  },
  specificEventView3: {
    width: '100%',
    height: '20.5%',
    backgroundColor: '#222',
    borderRadius: 20
  },
  specificEventView4: {
    width: '100%',
    height: '61.1%',
    backgroundColor: '#111',
    borderRadius: 20
  },
  view: {
    top: '-2%',
    justifyContent: 'center',
    width: '15%',
    height: '120%',
    backgroundColor: 'blue',
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
  specificEventImage: {
    width: '376%',
    height: '100%',
    aspectRatio: 2.5,
  }
})