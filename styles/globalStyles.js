import { StyleSheet } from "react-native";

export const GS = StyleSheet.create({
  content: {
  height: '75%',
  backgroundColor: '#181818',
  paddingHorizontal: 20,
  },
  contentWhenNoTop: {
    top: '5%',
    height: '90%',
    backgroundColor: '#181818',
    paddingHorizontal: 20,
    },
  creditContent: {
    top: '-2.5%',
    height: '75%',
    backgroundColor: '#181818',
    paddingHorizontal: 20,
  },
  creditImage: {
    bottom: '10%',
    alignSelf: 'center',
    height: 105,
    width: 200,
  },
  inputText: {
    backgroundColor: '#282828',
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 40,
    color: 'white',
  },
  notificationBack: {
    flexDirection: 'row',
    height: 25,
  },
  notificationText: {
    color: 'white',
    justifyContent: 'center',
    fontSize: 20
  },
  view: {
    alignSelf: 'center',
    width: '85%',
  },
  view2: {
    justifyContent: 'center',
    borderRadius: 10,
  },
  card: {
    height: 10
  },
});