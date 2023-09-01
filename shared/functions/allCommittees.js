import person from './person';
import React from 'react';
import { View } from 'react-native';

/**
 * Function for displaying all comitees 
 * @returns View containing all comittees
 */
export default function AllComitees(lang, theme) {
  return(
        <View>
          {person("leader", lang, theme)}
          {person("coleader", lang, theme)}
          {person("secretary", lang, theme)}
          {person("evntkom", lang, theme)}
          {person("pr", lang, theme)}
          {person("tekkom", lang, theme)}
          {person("ctf", lang, theme)}
          {person("eco", lang, theme)}
          {person("bedkom", lang, theme)}
        </View>
    )
}