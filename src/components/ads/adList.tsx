import { View, FlatList } from "react-native"
import { useSelector } from "react-redux"
import AdCluster from "./adCluster"
import { ErrorMessage } from "@components/shared/utils"
import Space from "@/components/shared/utils"
import { Dimensions, Platform } from "react-native"

/**
 * Displays the ad list
 */
export default function AdList (): JSX.Element {
    const { ads, search, renderedAds } = useSelector((state: ReduxState) => state.ad)
    const { skills } = useSelector((state: ReduxState) => state.ad)

    if (!renderedAds.length && !search) {
        return <ErrorMessage argument="wifi" />
    } else if (renderedAds.length > 0) {
        return (
            <View>
                {search === false
                    ? <Space height={Dimensions.get("window").height / (Platform.OS === "ios" ? 8.4 : 8)} />
                    : <Space height={Platform.OS === "ios" 
                        ? Dimensions.get("window").height / (skills.length / 23.2)
                        : Dimensions.get("window").height / (skills.length / 23.2)} />
                }
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    keyExtractor={(ad) => `${ad.id}`}
                    data={renderedAds}
                    renderItem={({item, index}) => (
                        <AdCluster index={index} ad={item} />
                    )}
                />
            </View>
        )
    } else {
        return <ErrorMessage argument={!ads.length ? "wifi" : "nomatch"} />
    }
}