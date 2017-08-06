const { resolve } = require('path');

module.exports = {
    target: 'node',
    entry: {
        server: resolve('src/server/index.ts')
    },
    output: {
        path: resolve('dist/server'),
        filename: '[name].js'
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    devtool: require('./devtool'),
    externals: require('./externals'),
    module: require('./module').server,
    plugins: require('./plugins').server,
    resolve: require('./resolve').server,
};

for (const rule of module.exports.module.rules) {
    rule.include = rule.include || [];
    rule.include.push(
        resolve('src/server'),
        resolve('src/lib'),
        resolve('src/client/dungeon'),
        resolve('src/client/entities')
    );
}
