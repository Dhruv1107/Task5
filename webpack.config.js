
module.exports = {
    entry: [`@babel/polyfill`, `./src/view.js`],
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
            }
        ],
    }
};