1. Make sure all code works in the EXPO GO app.
2. Increment the version numbers in app.json. For ios its "buildNumber" and for android its "versionCode" and version at the top. First digit for major overhauls. Second digit for larger updates and 3rd digit for small updates.
3. Push the project to make sure version codes stay up to date.
4. Comment in all native code blocks (everything firebase / messaging related).
5. Build for ios first using "eas build -p ios --auto-submit".
6. Log into the Apple Developer Account.
7. Download the app from Testflight.
8. Build the app for android using "eas build -p android".
9. Go to the Expo Developer dashboard and verify that the build has succeeded. 
10. Download the finished build.
11. Submit it to Google Play for review and auto release.
12. Submit it to App Store for review and auto release.
13. Push the new version numbers to the remote without any firebase / messaging code

Note: You can build for android first, if so run that command, download the app and test it. If everything works fine build for ios as well.