import { StyleSheet, Dimensions, Platform } from "react-native";  //Stylesheet file

export const AS = StyleSheet.create({         // Declares export AD ( Ad Styles )
    //========================= AdScreen =========================
    adBack: {                                // Card height and direction on eventscreen
        flexDirection: 'row',                     // Changes flexdirection to row
        alignItems: 'center',
    },
    adViewLeft: {
        alignItems: 'center',
        width: '22%'
    },
    adViewMid: {
        justifyContent: 'center',
        left: Platform.OS == 'ios' ? 7.5 : 10,
        paddingHorizontal: Platform.OS == 'ios' ? 6 : 6,
        width: '69.5%'
    },
    adViewRight: {
        width: '8.5%',
    },
    locationView: {                                    // Middle card view
        justifyContent: 'center',                 // Horizontally centers
    },
    title: {                                    // Eventname text on eventScreen
        maxHeight: Platform.OS == 'ios' ? 20*3 : 17*2.5,
        fontSize: Platform.OS == 'ios' ? 20 : 17,                             // Text font size
    },
    loc: {                                      // Eventlocation text on eventScreen
        fontSize: Platform.OS == 'ios' ? 15 : 13
    },
    organizationLogoSmall: {
        alignSelf: 'center',                      // Centers the image
        width: (Dimensions.get('window').width)-4,// Almost full csreen width
        height: 150,                              // Fixed height of 150px
        resizeMode: 'contain'                     // Adjusts the image to fit
    },
    adViewTitle: {
        left: 5,
        fontSize: 40,
    },
    bellSize: {                                   // Middle sized icons
        height: 40,                               // Fixed height of 40px
        width: 40,                                // Fixed width of 40px
    },
    bellPosition: {
        top: -3,
    },
    adBannerSmall: {
        height: 55,
        aspectRatio: 3/2,
        resizeMode: 'contain'
    },
    adClusterImage: {                               // Position of specific event color circle
        aspectRatio: 3/2
    },
    smallerCheckIcon: {                         // Small check icon inside filter
        height: 20,                               // Fixed height of 20px
        top: '0%',                                // Fixed to top
        alignSelf: 'center',                      // Vertically centered
    },
    //======================== SpecificAdScreen ===================
    specificAdInfoView: {                       // Layout for specificAdScreen
        flexDirection: 'row',                     // Flexdirection set to row
        alignItems: 'center'                      // Vertically centers
    },
    specificAdView1: {                          // Layout for the image on specificAdView
        alignItems: 'center',                     // Vertically centers
        height: 100,                              // Fixed height of 100px
        overflow: 'hidden'                        // Hides the overflow (elements outside the view)
    },
    specificAdImage: {                          // The header image on specificListingScreen
        alignSelf: 'center',                      // Centers the image
        width: (Dimensions.get('window').width)-4,// Almost full csreen width
        height: 150,                              // Fixed height of 150px
        resizeMode: 'contain'                     // Adjusts the image to fit
    },
    //======================== AdComponentStyles ===================
    size: {                                     // Middle sized icons
        height: 40,                               // Fixed height of 40px
        width: 40                                 // Fixed width of 40px
    },
    absoluteView: {                             // Middle sized icons
        flexDirection: 'row',                     // Flexdirection set to row
    },
    adLight: {                                  // Position of specific ad color circle
        top: -10,                               // Moves adLight 10px upwards
        height: 0,
        width: 10,
    },
    specificAdLight: {                          // Position of specific ad color circle
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
    specificAdLight: {                          // Ad organizer circle on SES
        left: 8,                                  // Moved 8px rightwards
        height: 20,                               // Fixed height 20px
        width: 20                                 // Fixed width 20px
    },
    filterText: {                               // AdScreen filter text
        alignSelf: 'center',                      // Vertically centered
        alignItems: 'center',                     // Content vertically centered
        marginTop: 10,                            // Top margin of 10px
        width: '95%',                             // Width of filter 95% of parent view
        marginHorizontal: 10,                     // Horizontal margin  
        height: 30,                               // Height of filter text
        borderRadius: 15,
        color: 'white',                           // White text color (should be moved to depend on theme)
    },
    filterView: {                               // Filter view
        paddingTop: 10,                           // Top padding of 10px
        flexDirection: 'row',                     // Flexdirection set to row
        marginHorizontal: 10,                     // 10px Horizontal margin
        borderBottomLeftRadius: 15,               // Curves bottom left conrner
        borderBottomRightRadius: 15,              // Curves bottom right corner
    },
    checkBox: {                                 // Position of adfilter check icon
        top: '-50%',                              // Moves the checkbox 50% upwards
        right: 20,                                // Moves checkbox 20px leftwards
    },  
    checkedBox: {                               // Adfilter checked icon
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
        top: 5,
        height: 40,                             // Fixed icon height of 40px
        width: 40                               // Fixed icon width of 40px
    },
    adButton: {                                 // Join ad button 
        height: 30,                               // Fixed height of 30px
        width:Dimensions.get('window').width/2.75,// Fixed width of 1/2.75 of the screen
        alignSelf: 'center',                      // Horizontally centered
        borderRadius: 10                          // Rounded corners
    },
    mazemapIcon: {                              // Mazemap icon used on SES
        left: 4,                                  // Shifted to the right side
        height: 20,                               // 20px high
        width: 10,                                // 10px wide
    },
    row: {                                      // When all u need is a row
        flexDirection: 'row'                      // Horizontal direction
    },
});