import { StyleSheet, Dimensions, PixelRatio } from "react-native";  // Stylesheet file

export const GS = StyleSheet.create({
  
//========================= EventScreen =========================
  content: { //Main view of every screen
    height: Dimensions.get('window').height+200,            // Dimensions.get('window').height/7.5
  },
  reportInputContentText: {                             // ReportScreen description text
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: '90%',
    borderRadius: 40,
  },
  notificationBack: {                                   // Horizontal card views on setting notifications
    flexDirection: 'row',
    height: 25,
  },
  notificationText: {                                   // Notification card text
    fontSize: 20
  },
  inputText: {                                          // ReportScreen name and notifier text
    alignSelf: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    borderRadius: 20,
  },
  view: { //Left view of notificationScreen
    alignSelf: 'center',
    width: '85%',
  },
  view2: { //Right view of notificationScreen
    justifyContent: 'center',
  },
  smallImage: { //Used anywhere there is a small image
    top: -30,
    alignSelf: 'center',
    height: 120,
    width: 150,
  },
  image200: { //Used anywhere there is a image with height of 200
    top: -30,
    alignSelf: 'center',
    height: 100,
    width: 200,
  },
  parentComitteeView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    maxWidth: '93%'
  },
  comittee1: {
    borderRadius: 10,
    width: '125%'
  },
  comittee2: {
    borderRadius: 10,
    width: '125%'
  },
  comittee3: {
    borderRadius: 10,
    width: '125%'
  },
  image80: {
    alignSelf: 'center',
    height: 80,
    width: 80
  },
  dropdown: {
    flexDirection: 'row',
    paddingLeft: 5,
    alignItems: 'center',
    height: 40,
  },
  dropdownContent: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    height: 36,
  },
  dropImage: {
    alignSelf: 'center',
    height: 60,
    width: 40
  },
  smallDropImage: {
    alignSelf: 'center',
    height: 40,
    width: 25
  },
  row: {
    flexDirection: 'row',
  },
  aboutImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
  },
  redMine: {
    height: 15,
    width: 20
  },
  tiny: {
    height: 15,
    width: 25
  },
  medium: {
    alignSelf: 'center',
    height: 50,
    width: 50
  },
  small: {
    height: 25,
    width: 35,
  },
  personImage: {
    alignSelf: 'center',
    width: 220,
    height: 220,
  },
  socialView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  socialPartView: {
    width: '30%',
    alignItems: 'center',
  },
  socialBigImage: {
    alignSelf: 'center',
    height: 100,
    width: 200
  },
  specificArticleView: { //Layout for the image on specificEventView
    alignItems: 'center',
  },
  articleImage: { //The header image on specificEventScreen
    width: '94%',
    height: 400
  },
  loginStatus: {
    position: 'absolute',
    left: Dimensions.get('window').width/5,
  }
});