import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

module.exports={
  THEME: {
    BACKGROUND: '#181818',          //Background of the app
    DARKER: '#111',                 //Contentcolor of the app
    ORANGE: '#fd8738',              //Logins color
    TEXTCOLOR: 'white',             //Textcolor of the app
    OPPOSITETEXTCOLOR: 'white',     //Opposite of the background color
    TITLETEXTCOLOR: '#777',         //ScreenTitleColor of the app
    SWITCHONSTATE: "#f1f1f1",       //Switch off state
    SWITCHOFFSTATE: "#fd8738",      //Switch on state
    TRACKCOLOR: "#181818",          //Track color of switch
    TRACKBACKGROUNDCOLOR: "#080808" //Background color of switch
  }
}
// export default ThemeContext = React.createContext('theme')

//   const themes = {
//     dark: {   //Dark theme
//         BACKGROUND: '#181818',          //Background of the app
//         DARKER: '#111',                 //Contentcolor of the app
//         ORANGE: '#fd8738',              //Logins color
//         TEXTCOLOR: 'white',             //Textcolor of the app
//         OPPOSITETEXTCOLOR: 'white',     //Opposite of the background color
//         TITLETEXTCOLOR: '#777',         //ScreenTitleColor of the app
//         SWITCHONSTATE: "#f1f1f1",       //Switch off state
//         SWITCHOFFSTATE: "#fd8738",      //Switch on state
//         TRACKCOLOR: "#181818",          //Track color of switch
//         TRACKBACKGROUNDCOLOR: "#080808" //Background color of switch
//     },
//     light: {    //Light theme
//       BACKGROUND: 'white',              //Background of the app
//       DARKER: '#F0F0F0',                //Contentcolor of the app
//       ORANGE: '#fd8738',                //Logins color
//       TEXTCOLOR: 'black',               //Textcolor of the app
//       OPPOSITETEXTCOLOR: 'black',       //Opposite of the text colorf
//       TITLETEXTCOLOR: 'black',          //ScreenTitleColor of the app
//       SWITCHONSTATE: "#fff",            //Switch off state
//       SWITCHOFFSTATE: "#fd8738",        //Switch on state
//       TRACKCOLOR: "#E8E8E8",            //Track color of switch
//       TRACKBACKGROUNDCOLOR: "#ffffff"   //Background color of switch
//     },
//     christmas: {    //Christmas theme
//       BACKGROUND: 'white',              //Background of the app
//       DARKER: '#800000',                //Contentcolor of the app
//       ORANGE: '#fd8738',                //Logins color
//       TEXTCOLOR: 'white',               //Textcolor of the app
//       OPPOSITETEXTCOLOR: 'black',       //Opposite of the background color
//       TITLETEXTCOLOR: 'white',          //ScreenTitleColor of the app
//       SWITCHONSTATE: "#800000",         //Switch off state
//       SWITCHOFFSTATE: "#013220",        //Switch on state
//       TRACKCOLOR: "#E8E8E8",            //Track color of switch
//       TRACKBACKGROUNDCOLOR: "#f0f0f0"   //Background color of switch
//     },
//     easter:{    //Easter theme
//       BACKGROUND: '#FFFFE0',
//       DARKER: '#ffe66b',
//       ORANGE: '#fd8738',
//       TEXTCOLOR: 'black',
//       TITLETEXTCOLOR: 'black',          //ScreenTitleColor of the app
//       OPPOSITETEXTCOLOR: 'black',       //Opposite of the background color
//       TITLETEXTCOLOR: 'white',          //ScreenTitleColor of the app
//       SWITCHONSTATE: "white",           //Switch off state
//       SWITCHOFFSTATE: "#ffe66b",        //Switch on state
//       TRACKCOLOR: "#FFFFE020",          //Track color of switch
//       TRACKBACKGROUNDCOLOR: "#FFFFE010" //Background color of switch
//     }
//   } 

// function ThemeProvider() {
//   const [currentTheme, setCurrentTheme] = useState("dark")

//   function getTheme() {
//     return themes[currentTheme]
//   }

//   function setTheme(theme) {
//     setCurrentTheme(theme)
//   }

//   return <ThemeContext.Provider value={{ getTheme, setTheme }} />
// }

// // then you wrap it:
// function App() {
//   return (
//     <ThemeProvider>
//       <OtherComponents />
//     </ThemeProvider>
//   )
// }

// // then any component can consume it:
// function AnotherComponent() {
//   const theme = useContext(ThemeContext)

//   const currentTheme = theme.getTheme()

//   return <div />
// }

//  Notes:
//  Dark background:    #181818
//  Darker background:  #111
//  Login Orange:       #fd8738
//  Beige:              #FFDEAD
//  Dark white:         E1D9D1
//  Light violet:       #CF9FFF
//  Mulberry (red):     #770737
//  Orchid (purple):    $5D3FD3
