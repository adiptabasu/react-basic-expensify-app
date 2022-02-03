const path = require('path');
// console.log(__dirname);
module.exports = {
    entry: './src/app.js',
    // entry: './src/playground/hoc.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',//this the babel parser
            test: /\.js$/,//files to check for babel parsing
            exclude: /node_modules/
        },
        // {
        //     test: /\.css$/,
        //     exclude: /node_modules/,
        //     use: [
        //         'style-loader',
        //         'css-loader'
        //     ]
        // },
        {
            test: /\.s?css$/,
            // exclude: /node_modules/,
            use: [
                // Creates `style` nodes from JS strings
                "style-loader",
                // Translates CSS into CommonJS
                "css-loader",
                // Compiles Sass to CSS
                "sass-loader",
            ]
        }]
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        client: {
            progress: true,
        },
        // contentBase: path.join(__dirname, 'public')
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 3000,
        historyApiFallback: true//added for react-router
    }
};