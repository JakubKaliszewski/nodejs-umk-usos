'use strict'
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: './views/vue/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname + '/public/'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
