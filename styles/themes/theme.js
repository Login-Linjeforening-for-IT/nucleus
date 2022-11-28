import { View, TouchableOpacity,Image} from 'react-native';
import React, {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SS } from '../settingStyles';

export default function Theme() {

    const [data, setData] = useState({
        theme: "0"
    }) 
    
    useEffect(() => {
        changeTheme();
      }, []);

    // useEffect({
    //     theme: AsyncStorage.getItem("theme")
    // })
    // const GetTheme = async () => {
    //     console.log(foo)
    //     try {
    //       const value = await AsyncStorage.getItem("theme")
    //       if(value !== null) {
    //         //something
    //       }else{
    //         //something
    //       }
    //     } catch(e) {
    //       console.log(e)
    //     }
    //   }
    
    const changeTheme = async() => {
        const value = await AsyncStorage.getItem("theme")
            if (value == "0" || !value) {
                setData({
                    theme: await AsyncStorage.getItem("theme")
                })
                try {
                    await AsyncStorage.setItem("theme", "1")
                } catch (e) {
                    console.log(e)
                }
    
                module.exports = {  //Global dark theme settings
                    THEME: { //Light theme
                      BACKGROUND: 'white',          //Background of the app
                        DARKER: '#E1D9D1',          //Contentcolor of the app
                        ORANGE: '#fd8738',          //Logins color
                        TEXTCOLOR: 'black',         //Textcolor of the app
                        TITLETEXTCOLOR: 'black'     //ScreenTitleColor of the app
                    }
                };
            }else if (value == "1"){
                setData({
                    theme: await AsyncStorage.getItem("theme")
                })
                try {
                    await AsyncStorage.setItem("theme", "2")
                } catch (e) {
                    console.log(e)
                }

                module.exports = {  //Global christmas theme settings
                    THEME: { //Christmas theme
                        BACKGROUND: 'white',          //Background of the app
                        DARKER: '#880808',            //Contentcolor of the app
                        ORANGE: '#fd8738',          //Logins color
                        TEXTCOLOR: 'black',         //Textcolor of the app
                        TITLETEXTCOLOR: 'black'     //ScreenTitleColor of the app
                    }
                };
            }else{
                setData({
                    theme: await AsyncStorage.getItem("theme")
                })
                try {
                    await AsyncStorage.setItem("theme", "0")
                } catch (e) {
                    console.log(e)
                }

                module.exports = {  //Global dark theme settings
                    THEME: { //Dark theme
                        BACKGROUND: '#181818',      //Background of the app
                        DARKER: '#111',             //Contentcolor of the app
                        ORANGE: '#fd8738',          //Logins color
                        TEXTCOLOR: 'white',         //Textcolor of the app
                        TITLETEXTCOLOR: '#777'      //ScreenTitleColor of the app
                    }
                  }; 
            }
        
      }
      
      return (
        <View>
        <TouchableOpacity onPress={() => changeTheme()}>
        {data.theme == 0 ? <Image style={SS.lightSwitchImage} source={require('../../assets/sun.png')} />: null}
        {data.theme == 1 ? <Image style={SS.lightSwitchImage} source={require('../../assets/moon.png')} />: null}
        {data.theme == 2 ? <Image style={SS.lightSwitchImage} source={require('../../assets/christmas.png')} />: null}
        </TouchableOpacity>
        </View>
    )
}
