const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpack = require('html-webpack-plugin')
const MinicssExtract = require('mini-css-extract-plugin')

const config = {
    mode: 'development',
    entry: './src/main.js',
    context: path.resolve(__dirname, '../'),
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [MinicssExtract.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [MinicssExtract.loader, 'css-loader', 'sass-loader'],
            },
            {
                test:/\.vue$/,
                use: 'vue-loader'
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg|webp|woff)$/,
                use: {
                    loader: 'url-loader',
                    options:{
                        limit: 1024,
                    }
                }
            }
        ]
    },
    resolve:{
        alias:{
            "@": path.resolve(__dirname, '../src')
        },
        extensions: ['.vue', '.js', '.json'],
        modules: ['./src', 'node_modules']
    },
    plugins:[
        new MinicssExtract({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
        }),
        new HtmlWebpack({
            filename: 'index.html',
            template: './static/index.html',
            inject: true
        }), 
        new VueLoaderPlugin(),
        
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[id].[hash:7].js',
        filename: '[name].js'
    },
}

module.exports = config