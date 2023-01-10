Features currently being worked on: 
none

Features planned:
1. Push notifications for new events 
    - requires cloud server but easy enough (should use firebase since its free)    
    - firebase is hard to setup
    - native-notify is easy to setup, but costs $25 per month

2. Send push notifications only if the category matches 
    - issue: cant access or check the notifications before they are delivered  
    - unknown solution

3. Implement mazemap     
    - issue: deprecated libraries
    - unknown solution
    - vent at tekkom meeting

4. Implement mail sending service 
    - issue: needs backend
    - vent at tekkom meeting
    - provides: 
        - report scheme
        - method to enroll for events through the app

5. Render the correct event image for each event on the SES (SpecificEventScreen) 
    - issue: cant concat the input string 
    - issue: cant be hard coded due to long review times
    - unknown solution - look into

6. Swipable navigation 
    - idea: Needs to be gesture and listener based, 
    - not sure how to do swipe logic
    - idea: could render with negative and positive values to create a illusion that a swipe is in progress, and update the swiping as the user goes?

7. Make green button automatically enroll you for the event clicked
    - Requires mail sending service to send enrollment via mail

Potential features: 
8. Admin tool
    - Provides way to manage things in the app
    - Add job ads through the app
    - Add events through the app

Bug fixes needed:
    - Fix case of bottom menu android being disabled