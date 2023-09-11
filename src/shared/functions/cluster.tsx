import FetchColor from "@styles/fetchTheme"
import { CS } from "@styles/clusterStyles"
import { View, Image } from "react-native"
import { ClusterProps } from "@interfaces"
import { useSelector } from "react-redux"
import { ES } from "@styles/eventStyles"
import React from "react"

/**
 * Card function for styling a div, displays a view containing curved
 * corners with content inside
 * @param {*} props     Content to put inside the card
 * @returns             Card with the props inside
 */
export default function Cluster ({ noColor, space, children }: ClusterProps) {
    const { theme } = useSelector( (state: ReduxState) => state.theme )

    return (
        <View style={{backgroundColor: !noColor
            ? FetchColor({theme, variable: "DARKER"})
            : ""
        }}>
            <View style={space
                ? {...ES.clusterContent, marginVertical: space}
                : ES.clusterContent}>
                { children }
            </View>
        </View>
    )
}

/**
 * Smaller cluster function for styling a div, displays a view containing curved
 * corners with content inside
 * @param {*} props     Content to put inside the cluster
 * @returns             Cluster with the props inside
 */
export function ClusterSmaller ({children}: React.PropsWithChildren<{}>) {

    const { theme } = useSelector( (state: ReduxState) => state.theme )

    return (
        <View style={{
                ...ES.clusterSmaller,
                backgroundColor: FetchColor({theme, variable: "DARKER"})}}>
            <View>
                { children }
            </View>
        </View>
    )
}

/**
 * Function for drawing a small image on the left side of the ad cluster
 * @param {string} banner Link to the advertisement banner
 * @returns               Small banner image
 */
export function ClusterArrow() {
    return (
        <View style={CS.arrowView}>
            <Image
                style={CS.arrowImage}
                source={require("@assets/icons/goback777.png")}
            />
        </View>
    )
}