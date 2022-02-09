const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'
    return {
        entry: './src/app.js',
        plugins: [new MiniCssExtractPlugin()],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
            publicPath: path.join(__dirname, 'public', 'dist')
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
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
                filename: './styles.css'
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
        devServer: {
            client: {
                progress: true,
            },
            static: {
                directory: path.join(__dirname, 'public'),
            },
            compress: true,
            port: 3000,
            historyApiFallback: true
        }
    }
};