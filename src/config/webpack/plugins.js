const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const tools = require('./localTools');
const p = process.env.NODE_ENV === 'production';


const cleanClient = new (require('clean-webpack-plugin'))(['client'], {
    root: resolve('dist'),
    verbose: true
});

const cleanServer = new (require('clean-webpack-plugin'))(['server'], {
    root: resolve('dist'),
    verbose: true,
    dry: false,

});


const NORMAL = 3;

const serverAndClientShares = [
    new webpack.DefinePlugin({
        'process.env.CSSDIR': JSON.stringify(resolve('src/client/dungeon')),
        'process.env.PNGDIR': JSON.stringify(resolve('src/client/dungeon')),
        'process.env.NORMAL': JSON.stringify(`${NORMAL}`),
        'process.env.BOSS': JSON.stringify(`${NORMAL * 2.5 / 2}`),
        'process.env.SUPER': JSON.stringify(`${NORMAL * 7 / 2}`)
       
    }),
]

if (p) {
    serverAndClientShares.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    );
}

const html = new (require('html-webpack-plugin'))({
    title: 'Quest For Dunguen (HTML5 version)',
    filename: 'index.html',
    template: require('html-webpack-template'),
    appMountId: 'app',
    inject: false,
    favicon: false,
    minify: p ? {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        html5: true,
        keepClosingSlash: true,
        useShortDoctype: true
    } : false,
    hash: p,
    cache: p,
    showErrors: true,
    xhtml: true,
    baseHref: p ? 'https://www.jacob-bogers.com/' : false,
    mobile: true,
    inlineManifestWebpackName: p ? 'webpackManifest' : false,
    links: [
        'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/594328/fonts.css'
    ],
    meta: [
        {
            name: 'description',
            content: 'Rogue game, Quest for Dungeon remake in HTML5'
        }
    ]
});

clientProd = !p ? [] : [
    // Extract CSS from bundled JS
    new (require('extract-text-webpack-plugin'))('styles.css'),
    // Extract external code into a separate "vendor" bundle
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        // Create implicit vendor bundle
        minChunks: function (module) {
            // Prevent vendor CSS/SASS from being bundled into "vendor.js"
            if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                return false;
            }

            return module.context && module.context.indexOf("node_modules") !== -1;
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }),
    new (require('inline-manifest-webpack-plugin'))({
        name: 'webpackManifest'
    })
];



const client = tools.flatten(cleanClient, serverAndClientShares, html, clientProd);
const server = tools.flatten(cleanServer, serverAndClientShares);


module.exports = { client, server };
