const webpack = require("webpack");

module.exports = {
    entry: __dirname + '/build/index.js',
    mode: "development",
    module: {
        rules: [
            {
                test: /\(.jsx|.js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\(.css)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(img|jpg|jpeg|woff|otf|ttf)$/,
                exclude: /node_modules/,
                use: ['file-loader']
            }
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin
    ],
    devServer: {
        hot: true,
        contentBase: __dirname + '/dist/',
        port: 8000,
        after: (app, server) => {

        }
    }
}