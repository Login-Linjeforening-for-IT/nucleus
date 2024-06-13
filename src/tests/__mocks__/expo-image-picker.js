module.exports = {
    launchImageLibraryAsync: jest.fn(async () => ({
        cancelled: false,
        uri: 'mocked-uri',
    })),
    launchCameraAsync: jest.fn(async () => ({
        cancelled: false,
        uri: 'mocked-uri',
    })),
    requestCameraPermissionsAsync: jest.fn(async () => ({
        status: 'granted',
    })),
    requestMediaLibraryPermissionsAsync: jest.fn(async () => ({
        status: 'granted',
    })),
}
  