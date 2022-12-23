import { StyleSheet } from "react-native";

export const T = StyleSheet.create({
//  =============================== CONTENT STYLES =============================
  red: {  //Red text - usually means something is missing
    alignSelf: 'center',
    color: 'red',
    fontSize: 15,
  },
  locationError: {  //Red text - usually means something is missing
    top: 2,
    left: 8,
    alignSelf: 'center',
    color: 'red',
    fontSize: 15,
  },
  text15: { //Text of size 15
    fontSize: 15,
  },
  bold40: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  bold28: {
    maxWidth: '89%',
    alignSelf: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  text30: { //Text of size 30
    fontSize: 30,
  },
  text25: { //Text of size 25
    fontSize: 25,
  },
  centered: { //Centered text of size 30
    alignSelf: 'center',
    fontSize: 30,
  },
  centeredOppositeColor: { //Centered text of size 30
    alignSelf: 'center',
    fontSize: 30,
  },
  centered15: { //Centered text of size 15
    alignSelf: 'center',
    fontSize: 15,
  },
  orangeCentered15: { //Centered text of size 15
    alignSelf: 'center',
    fontSize: 15,
  },
  centered20: { //Centered text of size 20
    alignSelf: 'center',
    fontSize: 20,
  },
  contact: { //Centered text of size 20, opposite color
    alignSelf: 'center',
    fontSize: 20,
  },
  centered25: { //Centered text of size 25
    alignSelf: 'center',
    fontSize: 25,
  },
  centeredBold25: { //Centered bold text of size 25
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 25,
  },
  centeredBold20: { //Centered bold text of size 20
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  centered50: { //Centered text of size 50
    alignSelf: 'center',
    fontSize: 50,
  },
  paragraph: {  //Used for paragraphs, size 15
    fontSize: 15,
  },
  orange15: {
    color: '#fd8738',
    fontSize: 15,
  },
  leaderTitle: {
    left: '17.5%',
    color: '#fd8738',
    fontSize: 20,
    fontWeight: 'bold'
  },
  leaderName: {
    left: '17.5%',
    fontSize: 20,
  },
  boldWithLine: {
    left: 5,
    justifyContent: 'center',
    maxWidth: '98%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  boldParagraph: {  //Used for paragraphs, size 15
    maxWidth: '100%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  copyright: {  //Copyright text
    textAlign: 'center',
    fontSize: 17,
  },
  specificEventInfo: {  //specificEventInfo text (+10px from left)
    alignSelf: 'center',
    fontSize: 20,
    left: 10
  },
  margin15: { //Centered text of size 15 with 15 margin
    alignSelf: 'center',
    fontSize: 15,
    margin: 15
  }, 
  filterCategoryText: {
    left: 10,
    fontSize: '13%',
  },
})
