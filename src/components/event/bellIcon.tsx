import { Image } from "react-native"
import ES from "@styles/eventStyles"
import React from "react"
import { useSelector } from "react-redux"

type BellIconProps = {
    orange?: boolean
}
/**
 * Small bell icon used to subscribe to event and job advertisement updates
 *
 * @returns Bell icon
 */
export default function BellIcon({orange}: BellIconProps): JSX.Element {
    let icon = require("@assets/icons/bell.png")
    const { theme } = useSelector((state: ReduxState) => state.theme)
    let isDark = theme === 0 || theme === 2 || theme === 3 ? true : false

    if (orange)         icon = require("@assets/icons/bell-orange.png")
    else if (isDark)    icon = require("@assets/icons/bell.png")
    else                icon = require("@assets/icons/bell-black.png")

    return <Image style={ES.bellSize} source={icon} />
}
