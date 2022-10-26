import { StyleSheet } from "react-native";

export const GS = StyleSheet.create({
//  =============================== CONTENT STYLES =============================
    top: {
      alignSelf: 'center',
      top: 50,
    },
    red: {
      alignSelf: 'center',
      color: 'red',
      fontSize: 15,
    },
    content: {
    flex: 16,
    backgroundColor: '#181818',
    paddingHorizontal: 20,
    },
    white: {
      alignSelf: 'center',
      color: 'white',
    },
    small: {
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredText: {
      alignSelf: 'center',
      fontSize: 30,
      color: 'white',
    },
    centeredText20: {
      alignSelf: 'center',
      fontSize: 20,
      color: 'white',
    },
    centeredText15: {
      alignSelf: 'center',
      fontSize: 15,
      color: 'white',
    },
    welcomeText: {
    paddingHorizontal: '22%',
    },
    welcomeImage: {
      left: -7,
      width: 200,
      height: 80,
    },

    //  ============================== TEXT SIZES ==============================

    h0: {
        color: 'white',
        fontSize: 60,
      },
      h1: {
        color: 'white',
        fontSize: 50,
      },
      h2: {
        color: 'white',
        fontSize: 40,
      },
      h3: {
        color: 'white',
        fontSize: 30,
      },
      h4: {
        color: 'white',
        fontSize: 25,
      },
      h5: {
        color: 'white',
        fontSize: 20,
      },
      h6: {
        color: 'white',
        fontSize: 15,
      },
      paragraph: {
        marginVertical: 8,
        lineHeight: 20,
        color: 'white',
        fontSize: 15,
      },
      creditText: {
        top: -20,
        alignSelf: 'center',
        fontSize: 30,
        color: 'white',
      },
      creditContent: {
        flex: 18,
        backgroundColor: '#181818',
        paddingHorizontal: 20,
    },
    creditImage: {
      top: 20,
      alignSelf: 'center',
      height: 150,
      width: 150,
  },
});