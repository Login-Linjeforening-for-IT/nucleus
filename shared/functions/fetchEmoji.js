/**
 * Function for fetching a emoji to include in a string.
 * @param {object} props Event object
 * @returns Emoji as string
 */
export default function fetchEmoji(props) {
    switch (props.category) {
      case 'TEKKOM':        return '🍕'
      case 'KARRIEREDAG':   return '👩‍🎓'
      case 'CTF':           return '🧑‍💻'
      case 'FADDERUKA':     return '🍹'
      case 'SOCIAL':        return '🥳'
      case 'BEDPRES':       return '👩‍💼'
      case 'LOGIN':         return '🚨'
      default:              return '💻'
    }
}