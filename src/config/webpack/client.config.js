const { resolve } = require("path");

const p = process.env.NODE_ENV === "production";

const LoaderOptionsPlugin = require("webpack").LoaderOptionsPlugin;

module.exports = {
    entry: {
        app: resolve("src/client/Main.tsx")
    },
    output: {
        path: resolve("dist/client"),
        filename: p ? "[name].[chunkhash:8].js" : "[name].js"
    },
    //devtool: require('./devtool'),
    devtool: false,
    module: require("./module").client,
    plugins: [
        ...require("./plugins").client,
        new LoaderOptionsPlugin({
            debug: true
        })
    ],
    resolve: require("./resolve").client,
    externals: [...require("./externals"), "react", "react-redux", "react-dom"],

};

for (const rule of module.exports.module.rules) {
    rule.include = rule.inculde || [];
    rule.include.push(resolve("src/client"), resolve("src/lib"));
}