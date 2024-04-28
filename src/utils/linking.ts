import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking"
import { RootStackParamList } from "./screenTypes";


const prefix = Linking.createURL('/');

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [prefix, 'https://login.no'],
    config: {
        screens: {
            Tabs: {
                initialRouteName: 'EventNav',
                screens:{
                    EventNav: {
                        screens: {
                            SpecificEventScreen: {
                                path: 'events/:eventID',
                                parse: {
                                    eventID: Number
                                }
                            }
                        }
                    },
                    AdNav: {
                        path: 'career',
                        screens: {
                            SpecificAdScreen: {
                                path: ':adID',
                                parse: {
                                    adID: Number
                                }
                            }
                        }
                    },
                    MenuNav: {
                        screens:{
                            AboutScreen: 'about',
                            BusinessScreen: 'companies'
                        }
                    }
                }
            }
        }
    }
}

export default linking