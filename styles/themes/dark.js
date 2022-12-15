import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";

let storedTheme = 0

// (async () => {
//   let foundEvent = await AsyncStorage.getItem('theme');
//   storedTheme = foundEvent;
// })();

//Need to check what the theme is here

switch (storedTheme) {
  case 1:
    module.exports = {
      DARK: {    //Light theme
        BACKGROUND: 'white',                //Background of the app
        DARKER: '#F0F0F0',                  //Contentcolor of the app
        CONTRAST: '#B8B8B8',                //Contrast to background and darker
        ORANGE: '#fd8738',                  //Logins color
        TEXTCOLOR: 'black',                 //Textcolor of the app
        OPPOSITETEXTCOLOR: 'black',         //Opposite of the text colorf
        TITLETEXTCOLOR: 'black',            //ScreenTitleColor of the app
        SWITCHONSTATE: "#fff",              //Switch off state
        SWITCHOFFSTATE: "#fd8738",          //Switch on state
        TRACKCOLOR: "#909090",              //Track color of switch
        TRACKBACKGROUNDCOLOR: "#909090"     //Background color of switch
      },
    }
    break;

  case 2:
    module.exports = {
      DARK: {    //Abyss theme
        BACKGROUND: '#081334',              //Background of the app
        DARKER: '#020c17',                  //Contentcolor of the app
        CONTRAST: '#090940',                //Contrast to background and darker
        ORANGE: '#fd8738',                  //Logins color
        TEXTCOLOR: 'white',                 //Textcolor of the app
        OPPOSITETEXTCOLOR: 'white',         //Opposite of the background color
        TITLETEXTCOLOR: 'white',            //ScreenTitleColor of the app
        SWITCHONSTATE: "#06061F",           //Switch off state
        SWITCHOFFSTATE: "#fd8738",          //Switch on state
        TRACKCOLOR: "#111",                 //Track color of switch
        TRACKBACKGROUNDCOLOR: "#000"        //Background color of switch
      },
    }
    break;

  case 3:
  module.exports = {
    DARK: {    //Sunset light theme
      BACKGROUND: '#4e0107',                //Background of the app
      DARKER: '#0f0000',                    //Contentcolor of the app
      CONTRAST: '#520404',                  //Contrast to background and darker
      ORANGE: '#fd8738',                    //Logins color
      TEXTCOLOR: 'white',                   //Textcolor of the app
      OPPOSITETEXTCOLOR: 'white',           //Opposite of the background color
      TITLETEXTCOLOR: 'white',              //ScreenTitleColor of the app
      SWITCHONSTATE: "#800000",             //Switch off state
      SWITCHOFFSTATE: "red",                //Switch on state
      TRACKCOLOR: "#4e0107",                //Track color of switch
      TRACKBACKGROUNDCOLOR: "#4e0107EE"     //Background color of switch
    },
  }
  break;

  case 4: 
  module.exports = {
    DARK:{    //Dark high contrast
      BACKGROUND: '#000020',                //Background of the app
      DARKER: '#000',                       //Contentcolor of the app
      CONTRAST: '#081334',                  //Contrast to background and darker
      ORANGE: '#fd8738',                    //Logins color
      TEXTCOLOR: 'white',                   //Textcolor of the app
      TITLETEXTCOLOR: 'white',              //ScreenTitleColor of the app
      OPPOSITETEXTCOLOR: 'white',           //Opposite of the background color
      TITLETEXTCOLOR: 'white',              //ScreenTitleColor of the app
      SWITCHONSTATE: "#000020",               //Switch off state
      SWITCHOFFSTATE: "#fd8738",            //Switch on state
      TRACKCOLOR: "#181818",                   //Track color of switch
      TRACKBACKGROUNDCOLOR: "#000000"          //Background color of switch
    }
  }
  break;

  case 5: 
    module.exports = {
      DARK:{    //Christmas theme
        BACKGROUND: 'white',                //Background of the app
        DARKER: '#800000',                  //Contentcolor of the app
        CONTRAST: '#820000',                //Contrast to background and darker
        ORANGE: '#fd8738',                  //Logins color
        TEXTCOLOR: 'white',                 //Textcolor of the app
        OPPOSITETEXTCOLOR: 'black',         //Opposite of the background color
        TITLETEXTCOLOR: 'white',            //ScreenTitleColor of the app
        SWITCHONSTATE: "#800000",           //Switch off state
        SWITCHOFFSTATE: "#013220",          //Switch on state
        TRACKCOLOR: "#E8E8E8",              //Track color of switch
        TRACKBACKGROUNDCOLOR: "#f0f0f0"     //Background color of switch
      }
    }
    break;

  case 6: 
  module.exports = {
    DARK:{    //Easter theme
      BACKGROUND: '#FFFFE0',                //Background of the app
      DARKER: '#ffe66b',                    //Contentcolor of the app
      CONTRAST: '#FFE200',                  //Contrast to background and darker
      ORANGE: '#fd8738',                    //Logins color
      TEXTCOLOR: 'black',                   //Textcolor of the app
      TITLETEXTCOLOR: 'black',              //ScreenTitleColor of the app
      OPPOSITETEXTCOLOR: 'black',           //Opposite of the background color
      TITLETEXTCOLOR: 'white',              //ScreenTitleColor of the app
      SWITCHONSTATE: "white",               //Switch off state
      SWITCHOFFSTATE: "#ffe66b",            //Switch on state
      TRACKCOLOR: "#FFFFE020",              //Track color of switch
      TRACKBACKGROUNDCOLOR: "#FFFFE010"     //Background color of switch
    }
  }
  break;

  default:
    module.exports = {
      DARK: {   //Dark theme
        BACKGROUND: '#181818',              //Background of the app
        DARKER: '#111',                     //Contentcolor of the app
        CONTRAST: '#222',                   //Contrast to background and darker
        ORANGE: '#fd8738',                  //Logins color
        TEXTCOLOR: 'white',                 //Textcolor of the app
        OPPOSITETEXTCOLOR: '#999',          //Opposite of the background color
        TITLETEXTCOLOR: '#777',             //ScreenTitleColor of the app
        SWITCHONSTATE: "#f1f1f1",           //Switch off state
        SWITCHOFFSTATE: "#fd8738",          //Switch on state
        TRACKCOLOR: "#181818",              //Track color of switch
        TRACKBACKGROUNDCOLOR: "#080808"     //Background color of switch
    }}
    break;
}