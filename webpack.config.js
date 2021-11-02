/* global require process __dirname module*/
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {merge} = require('webpack-merge');

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
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
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
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    include: path.resolve(ROOT_PATH, 'src'),
                    use: [
                        {loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ["react-hot-loader/babel"]
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            historyApiFallback: true,
            hot: true,
            port: 8080,
            client: {
                progress: true,
            }
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

