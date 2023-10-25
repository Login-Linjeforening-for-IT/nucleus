import { View, FlatList } from "react-native"
import { useSelector } from "react-redux"
import AdCluster from "./adCluster"
import { ErrorMessage } from "@components/shared/utils"

/**
 * Displays the ad list
 */
export default function AdList (): JSX.Element {
    const { ads, search, renderedAds } = useSelector((state: ReduxState) => state.ad)

    if (!renderedAds.length && !search) {
        return <ErrorMessage argument="wifi" />
    } else if (renderedAds.length > 0) {
        return (
            <View>
                <FlatList
                    style={{minHeight: "100%"}}
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