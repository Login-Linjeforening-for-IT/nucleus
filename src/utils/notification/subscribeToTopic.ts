import { getExpoPushTokenAsync } from 'expo-notifications'
import config from '@/constants'

/**
 * Subscribes the user to a topic.
 */
export async function subscribeToTopic(topic: string) {
    try {
        const tokenData = await getExpoPushTokenAsync()
        const token = tokenData.data

        await fetch(`${config.app_api_url}/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, topic }),
        })

        return { result: true, feedback: `Subscribed to ${topic}` }
    } catch (e: any) {
        return { result: false, feedback: `Subscription to topic failed: ${e.message}` }
    }
}

/**
 * Unsubscribes the user from a topic.
 */
export async function unsubscribeFromTopic(topic: string) {
    try {
        const tokenData = await getExpoPushTokenAsync()
        const token = tokenData.data

        await fetch(`${config.app_api_url}/unsubscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, topic }),
        })

        return { result: true, feedback: `Unsubscribed from ${topic}` }
    } catch (e: any) {
        return { result: false, feedback: `Unsubscribe from topic failed: ${e.message}` }
    }
}
