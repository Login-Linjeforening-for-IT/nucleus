import { StyleSheet } from "react-native";                // Stylesheet file
import { Dimensions } from "react-native";                // Screen dimensions

export const MS = StyleSheet.create ({                    // Declares the export - meant for styling menus
                                                          // --- TOP MENU ---
  screenTitle: {                                          // Big headertitle
    textAlign: 'center',                                  // Horizontal center
    marginTop: Dimensions.get('window').height/30,        // Adds top margin based on screen height
    alignSelf: 'center',                                  // Vertically centers
    fontSize: 35,                                         // Text font size
  },
  smallTitle: {                                           // Small headertitle (for VERY LONG words)
    textAlign: 'center',                                  // Horizontal center
    marginTop: Dimensions.get('window').height/30,        // Adds top margin based on screen height
    alignSelf: 'center',                                  // Vertically centers
    fontSize: 25,                                         // Text font size 
  },
  smallMultilineTitle: {                                  // Small headertitle (for multiline)
    maxWidth: 190,                                        // Max width to ensure it doesnt move other elements
    left: 15,                                             // Moves it 15 pixels rightwards
    alignSelf: 'flex-end',                                // Vertical flex end
    marginBottom: Dimensions.get('window').height/50,     // Used together with alignSelf to vertically center
    fontSize: 20,                                         // Text font size
  },
  topMenu: {                                              // Top menu background view
    flexDirection: 'row',                                 // Changes flex direction to allow for multiple elements on the same horizontal level
    justifyContent: 'space-between',                      // Adds an equal amount of space between every element
    height: Dimensions.get('window').height/7.5,          // Sets the height of the top menu to 13.3% of the screen height
  },
  tMenuIcon: {                                            // Size of top menu icons
    top: '5%',                                            // Moves the icon 5% downwards
    width: 100,                                           // Icon width
    height: 120                                           // Icon height
  },
  tMenuIconWithExtra: {                                   // Placement when extra icons are added to the top menu
    right: '50%',                                         // Moves the icon 50% leftwards
    top: 5,                                               // Moves the icon 5 px downwards
    width: 50,                                            // Icon width
    height: 120                                           // Icon height
  },
  goBack: {                                               // Size of goBack icon 
    top: '25%',                                           // Adjusts it 25% downwards (because its a very small icon)
    left: '-10%',                                         // Moves it 10% towards the left
    width: 80,                                            // Icon width
    height: 80,                                           // Icon height
  },
  searchIcon: {                                           // Filter icon
    top: '6%',                                            // Moves it 6% downwards
    right: 15,                                            // Moves it 15px towards the left
    width: 30,                                            // Icon width
    height: 120                                           // Icon height
  },  
  
                                                          // --- BOTTOM MENU ---
  bMenu: {                                                // Bottom menu view
      height: Dimensions.get('window').height/10,         // Sets the height of the bottom menu to 10% of the screen height
      flexDirection: 'row',                               // Changes the flex directions to allow for multiple elements horizontally
      justifyContent: 'space-evenly',                     // Adds equal amount of space between icons
      alignItems: 'center'                                // Vertically aligns items inside to center
  },
  bMenuIcon: {                                            // Bottom menu icons
    bottom: '13%',                                        // Moves icons 13% upwards
    width: 120,                                           // Icon width
    height: 120                                           // Icon height
  },
});