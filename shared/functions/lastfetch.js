import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Function for checking when the API was last fetched successfully.
 * @returns String
 */
export default async function LastFetch(param) {                          //  --- RETURNS WHEN EVENTS WERE FETCHED FROM STORAGE ---
    var time = param ? param : await AsyncStorage.getItem('lastFetch');

    if(time){
      var year   = parseInt((time)[0] + (time)[1] + (time)[2] + (time)[3])//  year
      var month  = parseInt((time)[5] + (time)[6])                        //  month
      var day    = parseInt((time)[8] + (time)[9])                        //  day
      var hour   = parseInt((time)[11] + (time)[12])                      //  hour
      var minute = parseInt((time)[14] + (time)[15])                      //  minute
      
      if(month < 10) month = '0' + month                                  // Checking and fixing missing 0
      if(day < 10) day = '0' + day                                        // Checking and fixing missing 0
      if(hour < 10) hour = '0' + hour                                     // Checking and fixing missing 0
      if(minute < 10) minute = '0' + minute                               // Checking and fixing missing 0

      const CleanedTime = hour + ':' + minute + ', ' + day + '/' + month + ', ' + year;

      return CleanedTime;
    } 
  }
