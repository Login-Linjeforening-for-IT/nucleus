import { useSelector } from 'react-redux';

// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8
// import messaging from '@react-native-firebase/messaging';
// COMMENT OUT THIS BOX WHILE TESTING IN EXPO 5/8

/**
 * **Function for subscribing and unsubscribing from notification topics**
 * 
 * When changing language it will setup notifications to follow language.
 * 
 * @param {string} topicID Topic identifier - "langChange" passed when changing language
 * @param {boolean} lang Language, 1 for norwegian, 0 for english
 * @param {boolean} status  true/false Subscribe or unsubscribe from given topic.
 */
export default async function topic(topicID, lang, status, category, catArray) {
  return null; // For testing in Expo
  // COMMENT OUT WHILE TESTING IN EXPO 6/8 - COMMENT IN THE ABOVE LINE INSTEAD
  const granted = await messaging().requestPermission();
  var topic = lang ? "norwegian"+topicID:"english"+topicID;
  
  if(granted) {
    if(topicID == "langChange") {
      if(lang) {
        // Unsubscribe from old language
        await messaging().unsubscribeFromTopic("englishIMPORTANT");
        await messaging().unsubscribeFromTopic("englishREMINDERS");
        await messaging().unsubscribeFromTopic("englishEVENTS");
        await messaging().unsubscribeFromTopic("englishBEDPRES");
        await messaging().unsubscribeFromTopic("englishTEKKOM");
        await messaging().unsubscribeFromTopic("englishCTF");
        await messaging().unsubscribeFromTopic("englishSOCIAL");

        // Subscribe to new language
        await messaging().subscribeToTopic("norwegianIMPORTANT");
        await messaging().subscribeToTopic("norwegianREMINDERS");
        await messaging().subscribeToTopic("norwegianEVENTS");
        await messaging().subscribeToTopic("norwegianBEDPRES");
        await messaging().subscribeToTopic("norwegianTEKKOM");
        await messaging().subscribeToTopic("norwegianCTF");
        await messaging().subscribeToTopic("norwegianSOCIAL")
        return null;
      }else{

        // Unsubscribe from old language
        await messaging().unsubscribeFromTopic("norwegianIMPORTANT");
        await messaging().unsubscribeFromTopic("norwegianREMINDERS");
        await messaging().unsubscribeFromTopic("norwegianEVENTS");
        await messaging().unsubscribeFromTopic("norwegianBEDPRES");
        await messaging().unsubscribeFromTopic("norwegianTEKKOM");
        await messaging().unsubscribeFromTopic("norwegianCTF");
        await messaging().unsubscribeFromTopic("norwegianSOCIAL");

        // Subscribe to new language
        await messaging().subscribeToTopic("englishIMPORTANT");
        await messaging().subscribeToTopic("englishREMINDERS");
        await messaging().subscribeToTopic("englishEVENTS");
        await messaging().subscribeToTopic("englishBEDPRES");
        await messaging().subscribeToTopic("englishTEKKOM");
        await messaging().subscribeToTopic("englishCTF");
        await messaging().subscribeToTopic("englishSOCIAL")
        return null;
      }
    } else {
      if(status) {
        // Subscribe to given topic for desired time intervals
        await messaging().subscribeToTopic(`${topic}`);
        if(catArray[0]) await messaging().subscribeToTopic(topic + category + "10m");
        if(catArray[1]) await messaging().subscribeToTopic(topic + category + "30m");
        if(catArray[2]) await messaging().subscribeToTopic(topic + category + "1h");
        if(catArray[3]) await messaging().subscribeToTopic(topic + category + "2h");
        if(catArray[4]) await messaging().subscribeToTopic(topic + category + "3h");
        if(catArray[5]) await messaging().subscribeToTopic(topic + category + "6h");
        if(catArray[6]) await messaging().subscribeToTopic(topic + category + "1d");
        if(catArray[7]) await messaging().subscribeToTopic(topic + category + "2d");
        if(catArray[8]) await messaging().subscribeToTopic(topic + category + "1w");
      } else {
        // Unsubscribe from given topic for all time intervals
        await messaging().unsubscribeFromTopic(`${topic}`);
        await messaging().unsubscribeFromTopic(topic + category + "10m");
        await messaging().unsubscribeFromTopic(topic + category + "30m");
        await messaging().unsubscribeFromTopic(topic + category + "1h");
        await messaging().unsubscribeFromTopic(topic + category + "2h");
        await messaging().unsubscribeFromTopic(topic + category + "3h");
        await messaging().unsubscribeFromTopic(topic + category + "6h");
        await messaging().unsubscribeFromTopic(topic + category + "1d");
        await messaging().unsubscribeFromTopic(topic + category + "2d");
        await messaging().unsubscribeFromTopic(topic + category + "1w");
      }
    }
  }
}