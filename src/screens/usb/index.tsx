import { KIOSK_URL } from "@/constants";
import { TabBarProps, } from "@type/screenTypes";
import { openBrowserAsync } from "expo-web-browser";
import { useEffect } from "react";
import { AppState, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function USBLink({ navigation }: TabBarProps<'USBLink'>): JSX.Element {
    const { theme } = useSelector((state: ReduxState) => state.theme)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
          // The screen is focused
          const status = await openBrowserAsync(KIOSK_URL)
          if (AppState.currentState === "active") {
              navigation.goBack()
          }
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    return (
        <View style={{height: "100%", backgroundColor: theme.background}}>
            <Text>Something went wrong</Text>
        </View>
    )
}