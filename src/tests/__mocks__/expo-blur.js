import { View } from 'react-native'

export const BlurView = ({ children, ...props }) => {
    return <View {...props}>{children}</View>
}
