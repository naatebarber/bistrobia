const webpack = require("webpack");
const contentful = require("contentful");
const contentHooks = require("./contentHooks");
const stripe = require("stripe")(contentHooks.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");

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
            app.use(bodyParser.json())
                .get("/cf_entry", (req, res, next) => {
                    cf.getEntry(req.query.entryID).then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.send({
                            "success": false,
                            "error": err
                        });
                    });
                })
                .get("/cf_post", (req, res, next) => {
                    let postType = req.query.type == "custom" ? "customPosting" : "posting";
                    cf.getEntries({
                        "content_type": postType
                    }).then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.send({
                            "success": false,
                            "error": err
                        });
                    })
                })
                .post("/charge", bodyParser.json(), (req, res, next) => {
                    const { token, description, amt } = req.body;
                    console.log(token);
                    (async () => {
                        const charge = await stripe.charges.create({
                            amount: amt,
                            currency: 'usd',
                            description: description,
                            source: token
                        });
                        return charge
                    })()
                    .then(data => res.send({
                        ok: true,
                        data: data
                    }))
                    .catch(err => res.send({
                        ok: false,
                        err: err
                    }));
                });
        },
        historyApiFallback: {
            index: 'index.html'
        }
    }
}