const mockAsyncStorage = {
    setItem: jest.fn((key, value) => Promise.resolve()),
    getItem: jest.fn((key) => Promise.resolve(null)),
    removeItem: jest.fn((key) => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
    multiGet: jest.fn((keys) => Promise.resolve(keys.map((key) => [key, null]))),
    multiSet: jest.fn((keyValuePairs) => Promise.resolve()),
    multiRemove: jest.fn((keys) => Promise.resolve()),
  };
  
  export default mockAsyncStorage;