import messaging from "@react-native-firebase/messaging"

/**
 * Subscribes the user to the passed topic
 * @param topic topic to subscribe to
 */
export default async function subscribeToTopic(topic: string) {
    console.log('subscribeToTopic', topic)
    try {
        console.log('subscribeToTopic tryeriaad')
        const subscribeWithTimeout = async (promise: any, timeout = 5000) => {
            let timeoutHandle: any;
            const timeoutPromise = new Promise((_, reject) => {
                timeoutHandle = setTimeout(() => reject(new Error('Timeout exceeded')), timeout);
            });
            return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutHandle));
        };
        
        try {
            console.log('Before subscribe');
            const result = await subscribeWithTimeout(messaging().subscribeToTopic(topic));
            console.log('After subscribe', result);
        } catch (error) {
            console.error('Error or Timeout subscribing to topic:', error);
        }

        try {
            console.log('Before subscribe');
            const result = await messaging().subscribeToTopic(topic);
            console.log('After subscribe', result);
            console.log('got result?')
        } catch (error) {
            console.log('catcheciii', error)
        }
        console.log('awaiting messaging result')
        return { result: true, feedback: `Subscribed to ${topic}`}
    } catch (e: any) {
        console.log('subscribeToTopic catch')
        if (e.message.includes('TOO_MANY_SUBSCRIBERS')) {
            return { result: false, feedback: `Too many subscribers for topic: ${topic}`}
        } else {
            return { result: false, feedback: `Subscription to topic failed: ${e}`}
        }
    }
}
