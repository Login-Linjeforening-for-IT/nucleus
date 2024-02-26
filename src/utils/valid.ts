import base64 from 'react-native-base64'

export default function valid(token: string | null) {
    if (!token) return false

    const decoded = base64.decode(token)
    const match = decoded.match(/[a-zA-Z]/)?.index || 0
    const valid = Number(decoded.slice(0, match - 1)) - new Date().getTime() < 28800000 ? 1 : 0
    return valid === Number(decoded[match - 1])
}
