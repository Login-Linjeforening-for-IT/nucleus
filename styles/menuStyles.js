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
    fontSize: 35
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
    fontSize: 30,                                                   // Text font size 
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
    fontSize: 25,                                                   // Text font size
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
    top: '35%',                                                     // Moves the icon 35% downwards
    width: 120,                                                     // Icon width
    height: 60,                                                     // Icon height
  },
  tMenuIconWithExtra: {                                             // Placement when extra icons are added to the top menu NOTE: NOT IN USE BUT DONT REMOVE
    right: '50%',                                                   // Moves the icon 50% leftwards
    top: 5,                                                         // Moves the icon 5 px downwards
    width: 50,                                                      // Icon width
    height: 120                                                     // Icon height
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
    right: '-9%',                                                   // Moving it 9% rightwards
    width: 140,                                                     // Icon width
  },
  
  // --- BOTTOM MENU ---
  bMenu: {                                                          // Bottom menu view
    position: 'absolute',
    top: Platform.OS == "ios" ? "73%":"75%",                        // iphone and samsung is 73%, oneplus is 75% -(PixelRatio.getPixelSizeForLayoutSize(48)), oneplus is 10ppi
    width: '100%',
    height: PixelRatio.getPixelSizeForLayoutSize(100),              // Sets the height of the bottom menu to 10% of the screen height
    flexDirection: 'row',                                           // Changes the flex directions to allow for multiple elements horizontally
    justifyContent: 'space-evenly',                                 // Adds equal amount of space between icons
    alignItems: 'center'                                            // Vertically aligns items inside to center
  },
  bMenuIconTO: {                                                    // Bottom menu icons
    bottom: PixelRatio.getPixelSizeForLayoutSize(40),               // Moves icons 13% upwards
    width: 120,                                                     // Icon width
    height: 65,                                                     // Icon height
  },
  bMenuIcon: {                                                      // Bottom menu icons
    bottom: PixelRatio.getPixelSizeForLayoutSize(2),               // Moves icons 13% upwards
    width: 120,                                                     // Icon width
    height: 65,                                                     // Icon height
  },
});