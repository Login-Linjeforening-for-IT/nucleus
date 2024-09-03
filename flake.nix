{
  description = "ecommerce";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    android-nixpkgs.url = "github:tadfisher/android-nixpkgs";
  };

  outputs = { self, nixpkgs, flake-utils, android-nixpkgs }: flake-utils.lib.eachDefaultSystem (system:
    let
      pkgs = import nixpkgs {
        inherit system;
        config = {
          android_sdk.accept_license = true;
          allowUnfree = true;
        };
      };

      pinnedJDK = pkgs.jdk17;
      buildToolsVersion = "34.0.0";
      ndkVersion = "25.1.8937393";
      androidComposition = pkgs.androidenv.composeAndroidPackages {
        buildToolsVersions = [ buildToolsVersion "33.0.1"];
        platformVersions = [ "34" ];
        cmakeVersions = [ "3.10.2" "3.22.1" ];
        includeNDK = true;
        ndkVersions = [ ndkVersion ];
      };
      sdk = androidComposition.androidsdk;
    in
    {
      devShell = pkgs.mkShell rec {
        buildInputs = with pkgs; [
          # Android
          pinnedJDK
          sdk
          pkg-config
          pkgs.nodePackages.eas-cli
          pkgs.nodejs_22
        ];

        JAVA_HOME = pinnedJDK;
        ANDROID_HOME = "${androidComposition.androidsdk}/libexec/android-sdk";
        ANDROID_NDK_HOME = "${ANDROID_HOME}/ndk/${ndkVersion}";

        GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${ANDROID_HOME}/build-tools/${buildToolsVersion}/aapt2";

        shellHook = ''
          alias easd="eas build --local -p android --profile preview;"
        '';
      };
    });
}