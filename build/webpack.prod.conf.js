const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpack = require('html-webpack-plugin')
const MinicssExtract = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const manifest = require('../public/dll/vendor_manifest.json');
const { DllReferencePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/main.js',
    context: path.resolve(__dirname, '../'),
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
                sideEffects: false,
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
                        outputPath: 'images/'
                    }
                }
            },
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
        new DllReferencePlugin({
            manifest
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, '../public/dll/'),
                to: '../dist/dll/'
            }
        ]),
        new MinicssExtract({
            filename: 'css/[name].[hash:7].css',
            chunkFilename: 'css/[name].[hash:7].chunk.css',
        }),
        new HtmlWebpack({
            filename: 'index.html',
            template: './public/index.html',
            title: 'xizh的项目',
            vendor: `/dll/${manifest.name}.dll.js`
        }), 
        new VueLoaderPlugin(),
    ],
    optimization:{
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: 4,
                terserOptions:{
                    compress:{
                        drop_console: true,
                    }
                },
                extractComments: false,
            }),
            new OptimizeCssAssetsPlugin()
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[hash:7].chunk.js',
        filename: 'js/[name].[hash:7].js'
    },
}

module.exports = config