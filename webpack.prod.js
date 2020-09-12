const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = () => {

    // config .env file
    const env = dotenv.config().parsed

    // make it ready to use
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next])
        return prev
    }, {})

    // return webpack configs
    return {
        entry: {
            app: './src/index.js'
        },
        watch: true,
        // devtool: 'source-map',
        output: {
            filename: 'bundle.[hash].js',
            path: path.resolve(__dirname, './build')
        },
        // devtool: 'inline-source-map',
        // devServer: {
        //     host: 'localhost',
        //     port: process.env.PORT,
        //     historyApiFallback: true,
        // },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },
                {
                    test: /\.(css)$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                        },
                    ]
                },
                {
                    test: /\.(css)$/,
                    exclude: /node_modules/, 
                    loader: 'postcss-loader'
                },
                {   
                    test: /\.(scss)$/,
                    exclude: /node_modules/, 
                    loader: 'sass-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
            new webpack.DefinePlugin(envKeys)
        ],
        resolve: {
            extensions: [
                '.js', '.jsx'
            ]
        }
    }
}