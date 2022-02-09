const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env, argv) => {
    // console.log('argv->', argv);
    const isProduction = argv.mode === 'production'
    // const CSSExtract = new MiniCssExtractPlugin('styles.css');
    return {
        entry: './src/app.js',
        // entry: './src/playground/hoc.js',
        plugins: [new MiniCssExtractPlugin()],
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
                // use: [
                //     // Creates `style` nodes from JS strings
                //     "style-loader",
                //     // Translates CSS into CommonJS
                //     "css-loader",
                //     // Compiles Sass to CSS
                //     "sass-loader",
                // ]
                use: [MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css'
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
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
    }
};