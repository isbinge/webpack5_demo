const parts = require('./webpack.parts');
const { merge } = require('webpack-merge');
const path = require('path');

const cssLoaders = [parts.autoprefix()];

const commonConfig = merge([
    {
        entry: ['./src/index.jsx'],
        output: {
            filename: '[name].[contenthash:8].js',
            chunkFilename: '[name].[contenthash:8].js',
            path: path.resolve(process.cwd(), 'dist'),
            clean: true,
        },
    },

    // parts.loadCSS(),
    parts.loadJavaScript(),

    parts.extractCSS(cssLoaders),
    parts.loadImages({ limit: 15000 }),
    parts.setFreeVariable('HELLO', 'hello from config'),

    parts.page({ template: path.resolve(parts.APP_SOURCE, 'template.ejs'), title: 'Demo' }),
]);

module.exports = commonConfig;
