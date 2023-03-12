import { SS } from '../styles/settingStyles';
import { View } from 'react-native';
import React from 'react';

/**
 * Returns a red colored button
 * @param {*} props 
 * @returns Button with the content displayed inside
 */
export default function NotifyButton (props) {   //Button, red
    return(
        <View style={SS.notifyButton}>
            <View style={SS.buttonContent}>
                { props.children }
            </View>
        </View>
    );
}