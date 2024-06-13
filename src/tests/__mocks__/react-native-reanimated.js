export default {
    View: 'View',
    Text: 'Text',
    ScrollView: 'ScrollView',
    call: () => {},
    Value: jest.fn().mockImplementation(() => ({
        setValue: jest.fn(),
    })),
}

export const useAnimatedGestureHandler = jest.fn()
export const useAnimatedStyle = jest.fn()
export const useSharedValue = jest.fn()
