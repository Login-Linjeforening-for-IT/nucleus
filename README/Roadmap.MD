Tasks currently being worked on: 
none

Tasks planned:
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

4. Implement mail sending service 
    - issue: deprecated libraries 
    - unknown solution
    - provides: 
        - report scheme
        - method to enroll for events through the app

5. Render the correct event image for each event on the SES (SpecificEventScreen) 
    - issue: cant concat the input string 
    - unknown solution

6. Swipable navigation 
    - idea: Needs to be gesture and listener based, 
    - not sure how to do swipe logic
    - idea: could render with negative and positive values to create a illusion that a swipe is in progress, and update the swiping as the user goes?

Potential tasks: 
7. Admin tool
    - Provides way to manage things in the app
    - Add job ads through the app
    - Add events through the app