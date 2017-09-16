const { resolve } = require('path');

const p = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        app: resolve('src/client/Main.tsx')
    },
    output: {
        path: resolve('dist/client'),
        filename: p ? '[name].[chunkhash].js' : '[name].js'
    },
    devtool: require('./devtool'),
    module: require('./module').client,
    plugins: require('./plugins').client,
    resolve: require('./resolve').client,
};

for (const rule of module.exports.module.rules) {
    rule.include = rule.inculde || [];
    rule.include.push(
        resolve('src/client'), 
        resolve('src/lib'),
        resolve('src/lib/instrumentation'),
        resolve('src/client/dungeon') //for loading png files not xml 
    );
}

