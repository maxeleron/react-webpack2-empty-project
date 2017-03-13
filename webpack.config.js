const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry : {
        app: './app/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    module : {
        rules : [
            {
                test : /\.(sass|scss$)/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader",
                }),
            },
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    'presets': ['es2015', 'react'],
                    'plugins': ['lodash']
                }
            }
        ]
    },
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty',
        fs: 'empty'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true,
        }),
        new LodashModuleReplacementPlugin({
            'collections': true,
            'paths': true
        }),
        new webpack.optimize.OccurrenceOrderPlugin,
        new webpack.optimize.UglifyJsPlugin
    ],
}