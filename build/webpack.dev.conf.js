const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpack = require('html-webpack-plugin')

const config = require('../config/index')
const currentEnviornment = process.env.appEnv

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
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
        new HtmlWebpack({
            filename: 'index.html',
            template: './public/index.html',
            title: 'xizh的项目'
        }),
        new VueLoaderPlugin(),
        
    ],
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        chunkFilename: '[id].chunk.js',
        filename: '[name].js'
    },
    devServer:{
        hot: true, // 开启热更新
        host: 'localhost',
        port: 8001,
        open: true,
        publicPath: '/',
        overlay: true,
        proxy: {
            '/api': {
                target: config[currentEnviornment].apiUrl,
                changeOrigin: true,
            }
        }
    }
}

module.exports = config