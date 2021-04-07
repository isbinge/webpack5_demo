const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const APP_SOURCE = path.join(process.cwd(), 'src');

exports.APP_SOURCE = path.join(process.cwd(), 'src');
exports.page = (config) => ({
    plugins: [new HtmlWebpackPlugin(config)],
});

exports.generateSourceMaps = ({ type }) => ({ devtool: type });

exports.loadJavaScript = () => ({
    module: {
        rules: [
            // Consider extracting include as a parameter
            {
                test: /\.jsx?$/,
                include: APP_SOURCE,
                use: 'babel-loader',
            },
        ],
    },
});
exports.minifyJavaScript = () => ({
    optimization: { minimizer: [new TerserPlugin()] },
});
exports.loadCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader, options }, 'css-loader'].concat(
                    loaders
                ),
                sideEffects: true,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
});

exports.autoprefix = () => ({
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [require('autoprefixer')],
        },
    },
});

exports.minifyCSS = ({ options }) => ({
    optimization: {
        minimizer: [new CssMinimizerPlugin({ minimizerOptions: options })],
    },
});
exports.loadImages = ({ limit }) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                parser: { dataUrlCondition: { maxSize: limit } },
            },
        ],
    },
});
exports.setFreeVariable = (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    return {
        plugins: [new webpack.DefinePlugin(env)],
    };
};
exports.devServer = ({ host, port }) => ({
    devServer: {
        contentBase: path.resolve(process.cwd(), 'dist'),
        host,
        port,
        hot: true,
        open: true,
    },
});
