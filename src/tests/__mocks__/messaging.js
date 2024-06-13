export default {
    onMessage: jest.fn(),
    setBackgroundMessageHandler: jest.fn(),
    getToken: jest.fn().mockResolvedValue('mockToken'),
    requestPermission: jest.fn().mockResolvedValue(true),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
}
