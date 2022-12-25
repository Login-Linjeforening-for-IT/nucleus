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
    height: 20,
    width: 20,
  },
  card: {
    borderRadius: 20,
    marginHorizontal: 10,
    marginTop: 10,
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 18
  },
  cardSmaller: {
    marginHorizontal: 10,
    borderRadius: 20,
  },
  smallSize: {
    height: 20,
    width: 20
  },
  specificEventLight: {
    left: 8,
    height: 20,
    width: 20
  },
  filterText: {  //eventScreen filter text
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '95%',
    paddingTop: 10,
    marginHorizontal: 10,
    height: 30,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    color: 'white',
  },
  filterView: {
    paddingTop: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  checkBox: { //Position of eventfilter check icon
    top: '-50%',
    right: 20,
  },
  checkedBox: { //Position of eventfilter checked icon
    top: '-80%',
    right: 20,
  },
  checkedIconCheckMark: { // Checkmark on check icon
    right: 18,
    top: '-1000000%',
    height: 0.004,
  },
  categoryView: {
    flexDirection: 'row',
    left: 30,
    top: 7,
    width: 122,
  },
  filterResetIcon: { 
      left: -60,
      top: 10,
      height: 40,
      width: 40
  },
})