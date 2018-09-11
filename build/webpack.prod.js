var path = require('path');
var config = require('./webpack.config');

module.exports = {
    mode: 'production',
    target: 'node',
    devtool: 'source-map',
    context: path.resolve(__dirname, "src"),
    // entry: config.entry,
    output: config.output,
    module: config.module,
    resolve: config.resolve,
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    }
};