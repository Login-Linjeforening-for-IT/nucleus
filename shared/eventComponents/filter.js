import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { T } from '../../styles/text';
import { ES } from '../../styles/eventStyles'

export default function EventFilter() {

    const [filter, setFilter] = useState({
        input: '',
        check_textInputChange: false
      }) 

    const filterInput = (val) => {
    if(val.length > 0) {
        setFilter({
        ...filter,
        input: val,
        check_textInputChange: true
        })
    }else{
        setFilter({
        ...filter,
        input: val,
        check_textInputChange: false
        })
    }}

    return(
    <View>
        <TextInput
            style={ES.filterText}
            placeholder='category'
            placeholderTextColor={'#555'}
            textAlign='center'
            onChangeText={(val) => filterInput(val)}
        />
    </View>)
}