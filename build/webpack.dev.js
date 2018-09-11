var path = require('path');
var config = require('./webpack.config');

module.exports = {
    mode: 'development',
    target: 'node',
    devtool: 'source-map',
    entry: config.entry,
    output: config.output,
    module: config.module,
    resolve: config.resolve
};