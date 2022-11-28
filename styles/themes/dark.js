import AsyncStorage from '@react-native-async-storage/async-storage';

var hei = 1

async function myFunction(){
  hei = await AsyncStorage.getItem('event')
  if (hei) {
    return( hei ) 
  } else {
    console.log('hei', hei)
return 0
  }
}
myFunction()
console.log(hei)

if (hei == 0){
  module.exports = {  //Global light theme settings
    THEME: { //Light theme
      BACKGROUND: 'white',              //Background of the app
        DARKER: '#F0F0F0',              //Contentcolor of the app
        ORANGE: '#fd8738',              //Logins color
        TEXTCOLOR: 'black',             //Textcolor of the app
        OPPOSITETEXTCOLOR: 'black',     //Opposite of the text color
        TITLETEXTCOLOR: 'black',        //ScreenTitleColor of the app
        SWITCHONSTATE: "#fff",          //Switch off state
        SWITCHOFFSTATE: "#fd8738",      //Switch on state
        TRACKCOLOR: "#E8E8E8",          //Track color of switch
        TRACKBACKGROUNDCOLOR: "#ffffff" //Background color of switch
    }
  };
}else if (hei == 2) { 
  module.exports = {  //Global christmas theme settings
    THEME: { //Christmas theme
        BACKGROUND: 'white',            //Background of the app
        DARKER: '#800000',              //Contentcolor of the app
        ORANGE: '#fd8738',              //Logins color
        TEXTCOLOR: 'white',             //Textcolor of the app
        OPPOSITETEXTCOLOR: 'black',     //Opposite of the background color
        TITLETEXTCOLOR: 'white',        //ScreenTitleColor of the app
        SWITCHONSTATE: "#800000",       //Switch off state
        SWITCHOFFSTATE: "#013220",      //Switch on state
        TRACKCOLOR: "#E8E8E8",          //Track color of switch
        TRACKBACKGROUNDCOLOR: "#f0f0f0" //Background color of switch
    }
  };
}else if (hei == 3) { 
  module.exports = {  //Easter theme settings
    THEME: { //Easter theme
        BACKGROUND: '#FFFFE0',
        DARKER: '#ffe66b',
        ORANGE: '#fd8738',
        TEXTCOLOR: 'black',
        TITLETEXTCOLOR: 'black',        //ScreenTitleColor of the app
        OPPOSITETEXTCOLOR: 'black',     //Opposite of the background color
        TITLETEXTCOLOR: 'white',        //ScreenTitleColor of the app
        SWITCHONSTATE: "white",       //Switch off state
        SWITCHOFFSTATE: "#ffe66b",      //Switch on state
        TRACKCOLOR: "#FFFFE020",          //Track color of switch
        TRACKBACKGROUNDCOLOR: "#FFFFE010" //Background color of switch
    }
  };
}else{
  module.exports = {  //Global dark theme settings
    THEME: { //Dark theme
        BACKGROUND: '#181818',          //Background of the app
        DARKER: '#111',                 //Contentcolor of the app
        ORANGE: '#fd8738',              //Logins color
        TEXTCOLOR: 'white',             //Textcolor of the app
        OPPOSITETEXTCOLOR: 'white',     //Opposite of the background color
        TITLETEXTCOLOR: '#777',         //ScreenTitleColor of the app
        SWITCHONSTATE: "#f1f1f1",       //Switch off state
        SWITCHOFFSTATE: "#fd8738",       //Switch on state
        TRACKCOLOR: "#181818",          //Track color of switch
        TRACKBACKGROUNDCOLOR: "#080808" //Background color of switch

    }
  };
}


//  Notes:
//  Dark background:    #181818
//  Darker background:  #111
//  Login Orange:       #fd8738
//  Beige:              #FFDEAD
//  Dark white:         E1D9D1
//  Light violet:       #CF9FFF
//  Mulberry (red):     #770737
//  Orchid (purple):    $5D3FD3
