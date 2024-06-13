export default {
    View: 'View',
    Text: 'Text',
    ScrollView: 'ScrollView',
    // Add any other components you need to mock
    call: () => {},
    Value: jest.fn().mockImplementation(() => ({
      setValue: jest.fn(),
    })),
    // Add other mocks for methods and properties as needed
  };
  
  export const useAnimatedGestureHandler = jest.fn();
  export const useAnimatedStyle = jest.fn();
  export const useSharedValue = jest.fn();