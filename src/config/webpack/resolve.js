const { resolve } = require('path');

const ext = ['.js', '.ts', '.jsx', '.tsx', '.scss', '.sass', '.css'];

module.exports = {
  server: {
    extensions: ext
  },
  client: {
    extensions: ext,
    alias: {
      'fs': resolve('src/client/fs-shim.js') 
    },
    modules: ['node_modules',resolve('src/client')]
  }
};

