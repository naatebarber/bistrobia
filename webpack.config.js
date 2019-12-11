const webpack = require("webpack");
const contentful = require("contentful");

var cf = contentful.createClient({
    space: "u1n96xp4szaw",
    accessToken: "5bb9cf2a0f26432f24ed31e19b5d8e89d6c23dcb43adea7268c7386b10b5366e"
});

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
            app.get("/cf_entry", (req, res, next) => {
                    console.log(req.query);
                    cf.getEntry(req.query.entryID).then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.send("Error fetching data");
                    });
                })
                .get("/cf_postings", (req, res, next) => {
                    cf.getEntries({
                        "content_type": "posting"
                    }).then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.send("Error fetching data");
                    })
                });
        },
        historyApiFallback: {
            index: 'index.html'
        }
    }
}