import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking"
import { TabParamList } from "./screenTypes";


const prefix = Linking.createURL('/');

const linking: LinkingOptions<TabParamList> = {
    prefixes: [prefix, 'https://login.no'],
    config: {
        screens: {
            EventScreen: {
                path: '',
                screens: {
                    SpecificEventScreen: {
                        path: 'events/:eventID',
                        parse: {
                            eventID: Number
                        }
                    }
                }
            },
            AdScreen: {
                path: 'jobs',
                screens: {
                    SpecificAdScreen: {
                        path: ':adID',
                        parse: {
                            adID: (adID) => Number(adID)
                        }
                    }
                }
            },
            MenuScreen: {
                screens:{
                    AboutScreen: 'about',
                    BusinessScreen: 'companies'
                }
            }
        }
    }
}

export default linking