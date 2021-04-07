const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const parts = require('./webpack.parts');

const developmentConfig = merge([
    {
        mode: 'development',
    },
    common,
    parts.devServer({
        host: '192.168.56.1',
        port: 9000,
        hot: true,
    }),
]);

module.exports = developmentConfig;
