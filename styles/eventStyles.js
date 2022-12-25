import { StyleSheet } from "react-native";    // Stylesheet file

export const ES = StyleSheet.create({         // Declares export ES ( Event Styles )
//========================= EventScreen =========================
  view: {                                     // Left side card view
    top: '-2%',                               // Moves events 2% upwards
    justifyContent: 'center',                 // Horizontally centers
    height: '120%',                           // Sets the height to be 120% of the view
    borderRadius: 10,                         // Adds 10px borderradius
  },
  view2: {                                    // Middle card view
    top: 7.5,                                 // Moves content 7.5px downwards
    justifyContent: 'center',                 // Horizontally centers
    alignItems: 'flex-start',                 // Vertically sets content to left side of view
    left: 10,                                 // Moves events 10px rightwards
    width: '70%',                             // Sets the width of the view to be 70% of the parent view
  },
  view3: {                                    // Right side card view
    position: 'absolute',                     // Uses absolute positioning to layer circle and checkmark
    right: 0,                                 // Sets it to absolute right
    height: '100%',                           // Has a height of 100% of the parent view
  },
  eventBack: {                                // Card height and direction on eventscreen
    flexDirection: 'row',                     // Changes flexdirection to row
    height: 55,                               // Has a fixed height of 55px
  },
  dayText: {                                  // Eventday text on specificEventScreen
    left: '20%',                              // Moves text 20% rightwards
    fontSize: 30,                             // Text font size
  },
  monthText: {                                // Eventmonth text on specificEventScreen
    alignSelf: 'flex-start',                  // Aligns the text vertically to top
    top: '-7.5%',                             // Moves text 7.5% upwards
    left: '20%',                              // moves events 20% rightwards
    fontSize: 20,                             // Text font size
  },
  eventCardDayText: {                         // Eventday text on eventScreen
    left: '15%',                              // Moves events 15% rightwards
    fontSize: 30,                             // Text font size
  },
  title: {                                    // Eventname text on eventScreen
    left: 5,                                  // Moves title 5px rightwards
    top: -5,                                  // Moves events 5px upwards
    fontSize: 20,                             // Text font size
  },
  loc: {                                      // Eventlocation text on eventScreen
    left: 5,                                  // Moves locationtext 5px rightwards
    top: -5,                                  // Moves locationtext 5px upwards
    fontSize: 20,
  },
  greenLight: {                               // Position of checklight on eventScreen
    top: '12%',                               // Moves greenLight 12% downwards
    alignSelf: 'center',                      // Vertically centers
  },
  checkContent: {                             // Renders big check icon
    left: 2,                                  // Moves events 2px rightwards
    top: '-30%',                              // Moves events 30% upwards
    alignSelf: 'center',                      // Vertically centers
  },
  smallerCheckIcon: {                         // Small check icon inside filter
    height: 20,                               // Fixed height of 20px
    top: '0%',                                // Fixed to top
    alignSelf: 'center',                      // Vertically centered
  },
//======================== SpecificEventScreen ===================
  specificEventInfoView: {                    // Layout for specificEventScreen
    flexDirection: 'row',                     // Flexdirection set to row
    alignItems: 'center'                      // Vertically centers
  },
  specificEventView1: {                       // Layout for the image on specificEventView
    alignItems: 'center',                     // Vertically centers
    height: 100,                              // Fixed height of 100px
    overflow: 'hidden'                        // Hides the overflow (elements outside the view)
  },
  specificEventImage: {                       // The header image on specificEventScreen
    width: '100%',                            // Sets the width to 100% of the available width from the parent view
    height: 100,                              // Fixed height of 100px
    aspectRatio: 3,                           // Uses aspectRatio 3:1 Note: resizeMode: 'contain' may work here
  },
  //======================== EventComponentStyles ===================
  size: {                                     // Middle sized icons
    height: 40,                               // Fixed height of 40px
    width: 40                                 // Fixed width of 40px
  },
  absoluteView: {                             // Middle sized icons
    flexDirection: 'row',                     // Flexdirection set to row
  },
  smallSize: {                                // Small icons
      height: 20,                             // Fixed height 20px
      width: 20                               // Fixed height 20px
  },
  eventLight: {                               // Position of specific event color circle
      top: -10,                               // Moves eventLight 10px upwards
      height: 0,
      width: 10,
  },
  specificEventLight: {                       // Position of specific event color circle
    height: 20,                               // Fixed height 20px
    width: 20,                                // Fixed width 20px
  },
  card: {                                     // Card styling
    borderRadius: 20,                         // Border radius
    marginHorizontal: 10,                     // Horizontal margin
    marginTop: 10,                            // Top margin
  },  
  cardContent: {                              // Card content styling
    marginHorizontal: 18,                     // Horizontal margin  
    marginVertical: 18                        // Vertical margin
  },
  cardSmaller: {                              // Smaller card
    marginHorizontal: 10,                     // Horizontal margin
    borderRadius: 20,                         // Border radius
  },
  smallSize: {                                // Small icons
    height: 20,                               // Fixed height 20px
    width: 20                                 // Fixed width 20px
  },
  specificEventLight: {                       // Event organizer circle on SES
    left: 8,                                  // Moved 8px rightwards
    height: 20,                               // Fixed height 20px
    width: 20                                 // Fixed width 20px
  },
  filterText: {                               // EventScreen filter text
    alignSelf: 'center',                      // Vertically centered
    alignItems: 'center',                     // Content vertically centered
    marginTop: 10,                            // Top margin of 10px
    width: '95%',                             // Width of filter 95% of parent view
    paddingTop: 10,                           // Padding top
    marginHorizontal: 10,                     // Horizontal margin  
    height: 30,                               // Height of filter text
    borderTopRightRadius: 15,                 // Curves top right corner
    borderTopLeftRadius: 15,                  // Curves top left corner
    color: 'white',                           // White text color (should be moved to depend on theme)
  },
  filterView: {                               // Filter view
    paddingTop: 10,                           // Top padding of 10px
    flexDirection: 'row',                     // Flexdirection set to row
    marginHorizontal: 10,                     // 10px Horizontal margin
    borderBottomLeftRadius: 15,               // Curves bottom left conrner
    borderBottomRightRadius: 15,              // Curves bottom right corner
  },
  checkBox: {                                 // Position of eventfilter check icon
    top: '-50%',                              // Moves the checkbox 50% upwards
    right: 20,                                // Moves checkbox 20px leftwards
  },  
  checkedBox: {                               // Eventfilter checked icon
    top: '-80%',                              // Moves the checkbox 80% upwards
    right: 20,                                // Moves the checkbox 20px leftwards
  },
  checkedIconCheckMark: {                     // Checkmark on check icon
    right: 18,                                // Moves icon 18px leftwards
    top: '-1000000%',                         // Moves the icon about 20px upwards
    height: 0.004,                            // Extremely small height as it cannot be 0 (should be revised to use absolute positioning so it doesnt depend on height)
  },
  categoryView: {                             // View for categories inside the filter
    flexDirection: 'row',                     // Flexdirection set to row
    left: 30,                                 // Moved 30px rightwards
    top: 7,                                   // Moved 7px downwards
    width: 122,                               // Fixed width of 122px
  },
  filterResetIcon: {                          // Filter reset icon
      left: -60,                              // Moved 60px leftwards
      top: 10,                                // Moved 10px downwards
      height: 40,                             // Fixed icon height of 40px
      width: 40                               // Fixed icon width of 40px
  },
})