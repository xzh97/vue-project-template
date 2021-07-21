const path = require('path');
const webpack = require('webpack');

const config = {
    mode: 'none',
    entry: {
        vendor: [
            'vue/dist/vue',
            'vue-router',
            'vuex',
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash:7]',
            path: path.resolve(__dirname, '../public/dll', '[name]_manifest.json'),
            context: __dirname
        })
    ],
    output: {
        path: path.resolve(__dirname, '../public/dll'),
        filename: '[name]_[hash:7].dll.js',
        library: '[name]'
    }
}
module.exports = config