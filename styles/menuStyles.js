import { StyleSheet, Dimensions, Platform } from "react-native";  // Importing needed dependencies


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
  filterScreenTitle: {                                               // Big headertitle for EventScreen (due to filter causing problems)
    position: 'absolute',
    textAlign: 'center',
    left: 100,
    top: Platform.OS == 'ios' ? '45%' : '40%',
    right: '-6%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: Platform.OS == 'ios' ? 30 : 28,                                                   // Text font size
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
    fontSize: Platform.OS == 'ios' ? 25 : 23,                                                   // Text font size 
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
    height: "9%",                                                  // Sets the height of the top menu to 13.3% of the screen height
  },
  tMenuIcon: {                                                      // Size of top menu icons
    top: '50%',                                                     // Moves the icon 35% downwards
    width: 32,                                                     // Icon width
    height: 32,                                                     // Icon height
  },
  goBack: {                                                         // Size of goBack icon 
    top: '52%',                                                     // Adjusts it 25% downwards (because its a very small icon)
    left: '140%',                                                   // Moves it 10% towards the left
    width: 25,                                                      // Icon width
    height: 25,                                                     // Icon height
  },
  filterIcon: {
    top: '37%',                                                     // Moves the icon 35% downwards
    height: 60,                                                     // Icon height
    right: '-20%',                                                   // Moving it 9% rightwards
    width: 140,                                                     // Icon width
  },
  multiTop: {
    width: 90,
    height: 60,
    top: 35,
    right: '5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  multiIcon: {
    height: 24,
    width: 24,
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
    width: 90,                                                     // Icon width
    height: 65,                                                     // Icon height
    alignSelf: 'center'
  },
  logoBackground: {
    width: 100,
    alignItems: 'center',
  },
  touchableIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
  }
});