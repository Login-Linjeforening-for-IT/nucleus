-- -- -- -- LOCAL TESTING -- -- -- --
1. Make sure that both your host (computer) and testing device (phone / emulator) is on the same wifi or cellular connection.
2. Start the project using "npx expo start".
3. Open the project on your phone using the Expo Go application (download from App Store or Google Play) and start developing.
4. Resolve all errors that arise during development.
5. Test every changed part for both iOS and Android.
6. Run "npx expo-doctor" to check for any errors.

-- -- -- -- PHYSICAL TESTING -- -- -- --
1. Complete local testing
2. Increment the version numbers in app.json. For ios its "buildNumber" and for android its "versionCode" and version at the top. First digit for major overhauls. Second digit for larger updates and 3rd digit for small updates.
3. Comment in all native code blocks (everything firebase / messaging related).
4. Build for ios first using "eas build -p ios --local" (local) or "eas build -p ios --auto-submit" (cloud).
5. Log into the Apple Developer Account.
6. Download the app from Testflight.
7. Test the application on a physical iPhone.
8. Build the app for android using "eas build -p android".
9. Go to the Expo Developer dashboard and verify that the build has succeeded.
10. Download the finished build.
11. Test the Android build on a physical Android device.
12. Push the repository to remote with the firebase / messaging code commented out.

-- -- -- -- RELEASE -- -- -- --
14. Submit it to Google Play for review and auto release.
15. Submit it to App Store for review and auto release.

Notes:
1. You can build for android first, if so do the steps relevant for Android first, then the iOS steps afterwards.
2. You can test using emulators, but physical devices are recommended as emulators gives limited functionality and can give bugs that are not present on physical devices.
3. Emulators do NOT support notifications.
