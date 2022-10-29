import { StyleSheet } from "react-native";

export const GS = StyleSheet.create({
//  =============================== CONTENT STYLES =============================
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
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    welcomeImage: {
      left: -7,
      width: 200,
      height: 80,
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
    alignItems: 'center',
    height: 50,
    borderRadius: 20,
    color: 'white',
},
});