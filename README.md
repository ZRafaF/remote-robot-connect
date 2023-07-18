<!--
 Copyright (c) 2023 Rafael Farias

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Remote Robot Connect

## Project setup

You can prebuild the app by running `npx expo prebuild`, this is needed for the BLE

## Building

### Cloud

For build I'm using EAS expo, to create an `.apk` build run:
`eas build -p android --profile preview`.

### Local

`npx expo prebuild`
`cd .\android\`
`./gradlew assembleDebug` or `./gradlew assembleRelease`

## References

When downloading depedencies use `npx expo install my-library`;

-   Starting React native project https://www.youtube.com/watch?v=pflXnUNMsNk&list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ&index=2&ab_channel=TheNetNinja
