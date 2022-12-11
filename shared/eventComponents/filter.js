import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ES } from '../../styles/eventStyles';
const GLOBAL = require('../../styles/themes/dark');
import { T } from '../../styles/text';
import { CheckBox, CheckedBox } from '../sharedComponents';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Filter(props) {
    let events = props.events;

    const [clickedCategory, setClickedCategory] = useState([]);
    const [category] = useState([
        {id: '1', category: 'TEKKOM'}, 
        {id: '2', category: 'SOCIAL'},
        {id: '3', category: 'CTF'},
        {id: '4', category: 'KARRIEREDAG'}, 
        {id: '5', category: 'FADDERUKA'},
        {id: '6', category: 'BEDPRES'},
        {id: '7', category: 'LOGIN'},
    ]);

    const [filter, setFilter] = useState({
        input: null,
        check_textInputChange: false
    }); 

    const filterInput = (val) => {
        setFilter({
        ...filter,
        input: val,
        check_textInputChange: true
        });
    }

    if (filter.input != null) {
        if(clickedCategory.length > 0) {
        // First filter category then filter text
        //  What to do if they have selected category and input text
            if (typeof filter.input === 'string') {
                (async() => {    
                const filteredEvents = events.filter(event => clickedCategory.includes(event.category) && event.title.toLowerCase().includes(filter.input.toLowerCase()));
                await AsyncStorage.setItem("filteredEvents", JSON.stringify(filteredEvents));
                })();
            }
        } else {
        //  What to do if they have only input text
            if (typeof filter.input === 'string') {
                (async() => {    
                const filteredEvents = events.filter(event => event.title.toLowerCase().includes(filter.input.toLowerCase()));
                await AsyncStorage.setItem("filteredEvents", JSON.stringify(filteredEvents));
                })();
            }
        }
    } else {
        if(clickedCategory.length > 0) {
        // What to do if they have only clicked categories
            (async() => {    
                const filteredEvents = events.filter(event => !clickedCategory.includes(event.category));
                await AsyncStorage.setItem("filteredEvents", JSON.stringify(filteredEvents));
            })();
        } else {
            //  What to do if they have not done anything
            (async() => {
            await AsyncStorage.setItem("filteredEvents", JSON.stringify(events));
            })();
        }
    }
    
    const textInputRef = useRef(null);

    return(
        <View>
            <View style={ES.absoluteView}>
                <TextInput ref={val => { this.textInput = val }}
                    style={ES.filterText}
                    maxLength={40}
                    placeholder='Søk..'
                    placeholderTextColor={GLOBAL.DARK.TITLETEXTCOLOR}
                    textAlign='center'
                    onChangeText={(val) => filterInput(val)}
                />
                <TouchableOpacity onPress={() => this.textInput.clear()}>
                    <Image style={ES.filterResetIcon} source={require('../../assets/reset.png')} />
                </TouchableOpacity>
            </View>
            
            <View style={ES.filterView}>
                <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        keyExtractor={(item) => item.id}
                        data={category}
                        renderItem={({item}) => (
                            <View style={ES.categoryView}>
                                {clickedCategory.includes(item) ?
                                    <TouchableOpacity onPress={() => setClickedCategory(clickedCategory.filter((x) => x.id !== item.id))}>
                                        <Text style={T.filterCategoryText}>{item.category}</Text>
                                        <CheckedBox/>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => setClickedCategory([...clickedCategory, item])}>
                                        <Text style={T.filterCategoryText}>{item.category}</Text>
                                        <CheckBox/>
                                    </TouchableOpacity>
                                }
                                
                                
                            </View>
                        )}
                /><Text/>
            </View>
        </View>
        
    )
}