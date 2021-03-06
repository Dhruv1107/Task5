var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: [`whatwg-fetch`, `@babel/polyfill`, `./src/view.js`],
    output: {
        filename: `bundle.js`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            hash: true
        })
    ]
};