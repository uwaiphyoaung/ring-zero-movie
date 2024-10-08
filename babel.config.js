module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    'react-native-reanimated/plugin',
  ],
  overrides: [{
    "plugins": [
      ["@babel/plugin-transform-private-methods", {
      "loose": true
    }]
    ]
  }]
};
