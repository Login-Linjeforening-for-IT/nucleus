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
  
  export default mockAsyncStorage;