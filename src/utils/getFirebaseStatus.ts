import messaging from '@react-native-firebase/messaging'
import config from '../../config.json'

export default async function getFirebaseStatus(): Promise<Status> {
    const authorized = await messaging().hasPermission()

    if (!authorized) {
        return { token: 'User has not granted permission to access device token.', topics: ['Unavailable'] }
    }
    
    try {
        const token = await messaging().getToken()

        const response = await fetch(
            `https://iid.googleapis.com/iid/info/${token}?details=true`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${config.api_key}`,
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = await response.json()

        return { token: token, topics: Object.keys(data.rel.topics)}

    } catch (error) {
        return { token: `Error fetching token or topics: ${error}`, topics: ['Unavailable'] }
    }
}
