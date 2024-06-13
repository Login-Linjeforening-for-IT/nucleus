global.__DEV__ = true

const originalError = console.error

console.error = (...args) => {
    // The following if statement supresses source prop warnings in the Header component as this state is stored in redux, and extensive mocking is required to prevent the warning.
    // The failing test is 'App renders correctly' in App.test.tsx
    // Warning: Failed prop type: Invalid prop `source` supplied to `Image`, expected one of type [number].
    //       at Component (.../node_modules/react-native/jest/mockComponent.js:30:18)
    //       at Header (.../src/components/nav/header.tsx:17:41)
    if (
        args[0] + ' ' +  args[1] + ' ' + args[2] === 'Warning: Failed %s type: %s%s prop Invalid prop `source` supplied to `Image`, expected one of type [number].'
        && args[3].includes('at Header') && args[3].includes('src/components/nav/header.tsx')
    ) {
        return
    }

    originalError.call(console, ...args)
}

jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        __esModule: true,
        default: mockAsyncStorage,
    }
})
  
const mockAsyncStorage = {
    getItem: jest.fn((key) => {
        return new Promise((resolve) => {
            resolve(key)
        })
    }),
    setItem: jest.fn((key, value) => {
        return new Promise((resolve) => {
            resolve([key, value])
        })
    }),
    removeItem: jest.fn((key) => {
        return new Promise((resolve) => {
            resolve(key)
        })
    }),
    clear: jest.fn(() => {
        return new Promise((resolve) => {
            resolve()
        })
    }),
    getAllKeys: jest.fn(() => {
        return new Promise((resolve) => {
            resolve([])
        })
    }),
}

jest.mock('react-native-svg', () => ({
    Svg: 'Svg',
    Circle: 'Circle',
    Rect: 'Rect',
    Path: 'Path',
    G: 'G',
    Text: 'Text',
    Line: 'Line',
    TSpan: 'TSpan',
    TextPath: 'TextPath',
    Use: 'Use',
    Image: 'Image',
    Symbol: 'Symbol',
    Defs: 'Defs',
    LinearGradient: 'LinearGradient',
    RadialGradient: 'RadialGradient',
    Stop: 'Stop',
    ClipPath: 'ClipPath',
    Pattern: 'Pattern',
    Mask: 'Mask',
    Marker: 'Marker',
    ForeignObject: 'ForeignObject',
    SvgXml: 'SvgXml',
    SvgUri: 'SvgUri',
}))
