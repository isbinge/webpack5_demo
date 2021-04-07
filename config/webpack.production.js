const { merge } = require('webpack-merge');
const parts = require('./webpack.parts');
const path = require('path');
const common = require('./webpack.common');

const productionConfig = merge([
    common,
    {
        mode: 'production',
        output: {
            chunkFilename: '[name].[contenthash].js',
            filename: '[name].[contenthash].js',
            assetModuleFilename: '[name].[contenthash][ext][query]',
        },
    },
    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
            runtimeChunk: {
                name: 'runtime',
            },
        },
    },
    parts.minifyJavaScript(),
    parts.minifyCSS({ options: { preset: ['default'] } }),

    parts.generateSourceMaps({ type: 'source-map' }),
]);

module.exports = productionConfig;
