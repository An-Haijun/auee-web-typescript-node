var glob = require("glob");
var path = require('path');
var entry = {};

function getEntry() {
    var globPath = 'src/**/*.ts';
    var files = glob.sync(globPath);
    var fileMaps = {};
    files.forEach(function (key) {
        fileMaps[key.split('src/')[1].split(".ts")[0]] = "./"+key;
    });
    return fileMaps;
}

entry = getEntry();

var output = {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
}

module.exports = {
    entry: entry,
    output: output,
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
};