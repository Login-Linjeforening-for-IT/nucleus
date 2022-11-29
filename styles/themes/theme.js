import { View, TouchableOpacity,Image} from 'react-native';
import React, {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SS } from '../settingStyles';

export default function Theme() {

    const [data, setData] = useState({
        theme: "0"
    }) 
    
    useEffect(() => {
        changeTheme(); //Needs to use display theme not change
      }, []);
    
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
            }else if (value == "1"){
                setData({
                    theme: await AsyncStorage.getItem("theme")
                })
                try {
                    await AsyncStorage.setItem("theme", "2")
                } catch (e) {
                    console.log(e)
                }
            }else{
                setData({
                    theme: await AsyncStorage.getItem("theme")
                })
                try {
                    await AsyncStorage.setItem("theme", "0")
                } catch (e) {
                    console.log(e)
                }
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
