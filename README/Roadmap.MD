Features currently being worked on: 
none

Features planned:
    1. Push notifications for new events 
        - requires cloud server but easy enough (should use firebase since its free)    
        - firebase is hard to setup
        - should only be sent if the category matches
        - how to check for matching category before delivery?

    2. Implement mazemap     
        - issue: deprecated libraries
        - unknown solution
        - vent at tekkom meeting

    3. Implement mail sending service 
        - issue: needs backend
        - vent at tekkom meeting
        - provides: 
            - report scheme
            - method to enroll for events through the app

    4. Swipable navigation 
        - idea: Needs to be gesture and listener based, 
        - not sure how to do swipe logic
        - idea: could render with negative and positive values to create a illusion that a swipe is in progress, and update the swiping as the user goes?

    5. Make green button automatically enroll you for the event clicked
        - Requires mail sending service to send enrollment via mail

Potential features: 
    6. Admin tool
        - Provides way to manage things in the app
        - Add job ads through the app
        - Add events through the app

Bug fixes needed:
    1. Bottom navigation menu disabled android causes white footer
        -  Unknown how to check if the menu is disabled (easy to fix once we know this)