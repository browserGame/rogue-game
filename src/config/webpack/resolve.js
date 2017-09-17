const { resolve } = require('path');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const ext = ['.js', '.ts', '.jsx', '.tsx', '.scss', '.sass', '.css', '.sheet'];

module.exports = {
  server: {
    extensions: ext,
    modules: ['node_modules',resolve('src/server'), resolve('src/lib')],
    plugins: [ new TsConfigPathsPlugin() ],
    alias: {
      '~assets':'src/client/dungeon'
    }

  },
  client: {
    extensions: ext,
    modules: ['node_modules',resolve('src/client'), resolve('src/lib')],
    plugins: [ new TsConfigPathsPlugin() ],
    alias: {
      '~assets':'src/client/dungeon',
      'fs':'src/client/shims/fs.js',
      'path':'src/client/shims/path.js'
    }
  }
};

