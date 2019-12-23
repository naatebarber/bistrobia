const webpack = require("webpack"),
    contentful = require("contentful"),
    stripe = require("stripe"),
    bodyParser = require("body-parser");

const contentHooks = require("./contentHooks"),
    getEntry = require("./server/contentful/getEntry"),
    getPost = require("./server/contentful/getPost"),
    handleCharge = require("./server/stripe/handleCharge");

const contentfulClient = contentful.createClient({
        space: "u1n96xp4szaw",
        accessToken: "5bb9cf2a0f26432f24ed31e19b5d8e89d6c23dcb43adea7268c7386b10b5366e"
    }),
    stripeClient = stripe(contentHooks.STRIPE_SECRET_KEY);

module.exports = {
    entry: __dirname + '/build/App.jsx',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css)$/,
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
        before: (app) => {
            app.use(bodyParser.json())
               .get("/cf_entry", getEntry(contentfulClient))
               .get("/cf_post", getPost(contentfulClient))
               .get("/charge", handleCharge(stripeClient))
        },
        historyApiFallback: {
            index: 'index.html'
        }
    }
}