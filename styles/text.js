import { StyleSheet } from "react-native";    // Stylesheet file        

export const T = StyleSheet.create({          // Declares T - meant for all text styling
  red: {                                      // Red text - used when something is missing or went wrong
    alignSelf: 'center',                      // Vertically center
    color: 'red',                             // Text color
    fontSize: 15,                             // Text font size
  },
  locationError: {                            // Location missing error text
    top: 2,                                   // Moves 2 px downwards
    left: 8,                                  // Moves 8 px rightwards
    alignSelf: 'center',                      // Vertically centers
    color: 'red',                             // Text color
    fontSize: 15,                             // Text font size
  },
  text15: {                                   // Text of size 15
    fontSize: 15,                             // Text font size
  },
  bold40: {                                   // Bold text of size 40
    fontSize: 40,                             // Text font size
    fontWeight: 'bold',                       // Font weight bold
  },
  bold28: {                                   // Bold text of size 28 (30 is too big when bold)
    maxWidth: '89%',                          // Max width to avoid bugs
    alignSelf: 'center',                      // Horizontally centers
    fontSize: 28,                             // Text font size
    fontWeight: 'bold',                       // Font weight bold
  },
  text30: {                                   // Text of size 30
    fontSize: 30,                             // Text font size
  },
  text25: {                                   // Text of size 25
    fontSize: 25,
  },
  centered: {                                 // Centered text of size 30
    alignSelf: 'center',                      // Vertically centers
    fontSize: 30,                             // Text font size
  },
  centeredOppositeColor: {                    // Centered text using inverted text color (used for some rare styling where colors dont match)
    alignSelf: 'center',                      // Vertically centers
    fontSize: 30,                             // Text font size
  },
  centered15: {                               // Centered text of size 15
    alignSelf: 'center',                      // Vertically centers
    fontSize: 15,                             // Text font size
  },
  orangeCentered15: {                         // Orange centered text of size 15
    alignSelf: 'center',                      // Vertically centers
    fontSize: 15,                             // Text font size
  },
  centered20: {                               // Centered text of size 20
    alignSelf: 'center',                      // Vertically centers
    fontSize: 20,                             // Text font size
  },
  contact: {                                  // Centered text of size 20 for the contact screen
    alignSelf: 'center',                      // Vertically centers
    fontSize: 20,                             // Text font size
  },
  centered24: {                               // Centered text of size 24 (25 is a bit too wide)
    alignSelf: 'center',                      // Vertically centers
    fontSize: 24,                             // Text font size
  },
  centeredBold25: {                           // Centered bold text of size 25 (used for a few words per line max)
    fontWeight: 'bold',                       // Font weight bold
    alignSelf: 'center',                      // Vertically centers
    fontSize: 25,                             // Text font size
  },
  centeredBold20: {                           // Centered bold text of size 20
    fontWeight: 'bold',                       // Font weight bold
    textAlign: 'center',                      // Vertically centers
    fontSize: 20,                             // Text font size
  },
  centered50: {                               // Centered text of size 50
    alignSelf: 'center',                      // Vertically centers
    fontSize: 50,                             // Text font size
  },
  paragraph: {                                // Used for paragraphs, size 15
    fontSize: 15,                             // Text font size
  },
  orange15: {                                 // Orange text of size 15
    color: '#fd8738',                         // Logins color
    fontSize: 15,                             // Text font size
  },
  leaderTitle: {                              // Committee leader title text
    left: '17.5%',                            // Moves 17.5% rightwards
    color: '#fd8738',                         // Logins color
    fontSize: 20,                             // Text font size
    fontWeight: 'bold'                        // Font weight bold
  },
  leaderName: {                               // Committee leader name text
    left: '17.5%',                            // Moves text 17.5% rightwards
    fontSize: 20,                             // Text font size
  },
  boldWithLine: {                             // Bold text with line next to it
    left: 5,                                  // Moves it 5px rightwards
    justifyContent: 'center',                 // Horizontally centers (used together with flexdirection: row)
    maxWidth: '98%',                          // Max width
    fontSize: 15,                             // Text font size
    fontWeight: 'bold',                       // Font weight bold
  },
  boldParagraph: {                            // Used for bold paragraphs, size 15
    maxWidth: '100%',                         // Max width
    fontSize: 15,                             // Text font size
    fontWeight: 'bold',                       // Font weight bold
  },
  copyright: {                                // Copyright text (size: 17)
    textAlign: 'center',                      // Horizontally centers
    fontSize: 17,                             // Text font size
  },
  specificEventInfo: {                        // DpecificEventInfo text (+10px from left)
    alignSelf: 'center',                      // Horizontally centers (used together with flexdirection: row)
    fontSize: 20,                             // Text font size
    left: 10                                  // Moves text 10px rightwards
  },
  margin15: {                                 // Centered text of size 15 with 15 margin
    alignSelf: 'center',                      // Vertically centers
    fontSize: 15,                             // Text font size
    margin: 15                                // Margin on all sides
  },  
  filterCategoryText: {                       // Text used for filter categories
    left: 10,                                 // Moves text 10px rightwards
    fontSize: 12,                             // Text font size
  },
  listingText: {
    top: '25%',
    alignSelf: 'center',
    justifyContent: 'center'
  }
})
