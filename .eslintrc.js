const os = require('os');

module.exports = {
  root: true,
  extends: 'airbnb-base',
  plugins: [
    'import',
  ],
  env: {
    'shared-node-browser': true,
  },
  rules: {
    'linebreak-style': ['warn', os.EOL === '\n' ? 'unix' : 'windows'],
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'import/extensions': 'off',
  },
};
