const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var HtmlWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");
module.exports = {
    entry: {
        index: "./src/index.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '[name].html',
            template: "./src/template.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },

            {test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: Path.resolve(__dirname, "node_modules"),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [["@babel/preset-typescript"], ['@babel/preset-env', {targets: "defaults"}], ['@babel/preset-react', {runtime: "automatic"}], ["@babel/preset-flow"]],
                        plugins: ["@babel/plugin-transform-spread"]
                    },

                }
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            },
            {
                test: /\.(svg|png|jpg|gif|jpeg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name][hash].[ext]",
                        outputPath: "imgs"
                    }
                },
            },
            {
                test: /\.svg$/i,
                use: {
                    loader: "svg-url-loader",
                    options: {
                        // make loader to behave like url-loader, for all svg files
                        encoding: "base64",
                    },
                },
            },
        ]
    },
    experiments: {
        topLevelAwait: false
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.png']
    }
};