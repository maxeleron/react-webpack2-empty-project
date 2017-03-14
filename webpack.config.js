const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
process.traceDeprecation = true;

module.exports = {
    entry : {
        app: './app/app.js',
        some: './app/some.js',
        somecss: './app/somecss.css'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve( __dirname, 'dist')
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
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    'presets': ['es2015', 'react'],
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
        })
    ],
}