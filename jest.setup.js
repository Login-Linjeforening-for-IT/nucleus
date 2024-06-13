global.__DEV__ = true

jest.mock('@react-native-async-storage/async-storage', () => {
    return {
      __esModule: true,
      default: mockAsyncStorage,
    };
  });
  
  const mockAsyncStorage = {
    getItem: jest.fn((key) => {
      return new Promise((resolve) => {
        resolve(key);
      });
    }),
    setItem: jest.fn((key, value) => {
      return new Promise((resolve) => {
        resolve([key, value]);
      });
    }),
    removeItem: jest.fn((key) => {
      return new Promise((resolve) => {
        resolve(key);
      });
    }),
    clear: jest.fn(() => {
      return new Promise((resolve) => {
        resolve();
      });
    }),
    getAllKeys: jest.fn(() => {
      return new Promise((resolve) => {
        resolve([]);
      });
    }),
};

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
}));
