import { NotificationDelay } from 'login/shared/eventComponents/notificationDelay';

/**
 * Function for counting down till a set time.
 * 
 * @props Seconds to count down from
 * @returns String
 */
export default function Countdown(props) {
    const [timer, setTimer] = useState(NotificationDelay(props));
    useEffect(() => {
        const interval = setInterval(() => {                                          
            setTimer(NotificationDelay(props));
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);
    const days = Math.floor(timer/86400) == 0 ? '':Math.floor(timer/86400) + 'd '
    const hour = 1 + Math.floor((timer%86400)/3600) == 0 ? '':1 + Math.floor((timer%86400)/3600) + 't '
    const minutes = Math.floor(((timer%86400)%3600)/60) == 0 ? '':Math.floor(((timer%86400)%3600)/60) + 'm '
    const seconds = ((timer%86400)%3600)%60 == 0 ? '':((timer%86400)%3600)%60 + 's '
    const countdown = days + hour + minutes + seconds
    return countdown;
}