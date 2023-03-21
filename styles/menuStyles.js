import { StyleSheet, Dimensions, PixelRatio, Platform } from "react-native";  // Importing needed dependencies


export const MS = StyleSheet.create ({                              // Declares the export - meant for styling top and bottom menu
                                                                    // --- TOP MENU ---
  screenTitle: {                                                    // Big headertitle
    position: 'absolute',
    textAlign: 'center',
    marginTop: Dimensions.get('window').height/18,
    left: 75,
    right: 75,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 30
  },
  eventScreenTitle: {                                               // Big headertitle for EventScreen (due to filter causing problems)
    position: 'absolute',
    textAlign: 'center',
    top: Dimensions.get('window').height/35,
    left: 100,
    right: '-6%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: Dimensions.get('window').height/38,                  // Adds top margin based on screen height
    alignSelf: 'center',                                            // Vertically centers
    fontSize: 35,                                                   // Text font size
  },
  smallTitle: {                                                     // Small headertitle (for VERY LONG words)
    position: 'absolute',
    textAlign: 'center',
    top: Dimensions.get('window').height/17,
    left: 0,
    right: '-6%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'center',                                            // Vertically centers
    fontSize: 25,                                                   // Text font size 
  },
  smallMultilineTitle: {                                            // Small headertitle (for multiline)
    top: Dimensions.get('window').height/20,
    position: 'absolute',
    left: 50,
    right: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    alignSelf: 'flex-end',                                          // Vertical flex end
    fontSize: 20,                                                   // Text font size
  },
  topMenu: {                                                        // Top menu background view
    position: 'absolute',                                           // Absolute position (top menu should always be at the top)
    top: 0,                                                         // Fixed to the top
    left: '-2.5%',                                                  // Moved 2.5% leftwards
    width: '105%',                                                  // 105% width to layer on line with event left hand views
    flexDirection: 'row',                                           // Changes flex direction to allow for multiple elements on the same horizontal level
    justifyContent: 'space-between',                                // Adds an equal amount of space between every element
    height: "10%",                                                  // Sets the height of the top menu to 13.3% of the screen height
  },
  tMenuIcon: {                                                      // Size of top menu icons
    left: '100%',
    top: '42%',                                                     // Moves the icon 35% downwards
    width: 40,                                                     // Icon width
    height: 40,                                                     // Icon height
  },
  goBack: {                                                         // Size of goBack icon 
    top: '25%',                                                     // Adjusts it 25% downwards (because its a very small icon)
    left: '-10%',                                                   // Moves it 10% towards the left
    width: 80,                                                      // Icon width
    height: 80,                                                     // Icon height
  },
  filterIcon: {
    top: '37%',                                                     // Moves the icon 35% downwards
    height: 60,                                                     // Icon height
    right: '-20%',                                                   // Moving it 9% rightwards
    width: 140,                                                     // Icon width
  },
  multiTop: {
    width: 90,
    top: '50%',
    right: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  multiIcon: {
    height: 28,
    width: 28,
  },
    // --- BOTTOM MENU ---
  bMenu: {                                                          // Bottom menu view
    position: 'absolute',
    top: Platform.OS == "ios" ? "73%":null,
    bottom: Platform.OS == "ios" ? null : 350-Dimensions.get('window').height/3.3,
    width: '100%',
    height: "10%",//Dimensions.get('window').height/4,              // Sets the height of the bottom menu to 10% of the screen height
    flexDirection: 'row',                                           // Changes the flex directions to allow for multiple elements horizontally
    justifyContent: 'space-evenly',                                 // Adds equal amount of space between icons
  },
  bMenuIconTO: {                                                    // Bottom menu icons
    width: 120,                                                     // Icon width
    height: 65,                                                     // Icon height
  },
  bMenuIcon: {                                                      // Bottom menu icons
    bottom: '10%',
    width: 120,                                                     // Icon width
    height: 65,                                                     // Icon height
  },
});