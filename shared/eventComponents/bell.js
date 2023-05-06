import { ES } from '../../styles/eventStyles';
import { View, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
/**
 * Small bell icon used to subscribe to event and job advertisement updates
 * @returns Green Light svg
 */
export default function Bell(orange) {                          // Bell icon
    const { theme }    = useSelector( (state) => state.theme )  //  Theme state
    if (orange.orange) {
        return(
            <View>
                 <Image 
                    style={ES.bellSize} 
                    source={
                        require('../../assets/icons/bell-orange.png')
                    } 
                />
            </View>
        );
    } else {
        return(
            <View>
                 <Image 
                    style={ES.bellSize} 
                    source={theme == 0 || theme == 2 || theme == 3 ? 
                        require('../../assets/icons/bell.png') 
                    : 
                        require('../../assets/icons/bell-black.png')} 
                />
            </View>
        );
    }
};