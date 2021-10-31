/* global require process __dirname module*/
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);

const common = {
    entry: path.resolve(ROOT_PATH, 'src'),
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: path.resolve(ROOT_PATH, 'src')
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Playing With React and D3'
        })
    ]
};

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    include: path.resolve(ROOT_PATH, 'src'),
                    loaders: [
                        'react-hot',
                        'babel?presets[]=react,presets[]=es2015'
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            port: 8080
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

