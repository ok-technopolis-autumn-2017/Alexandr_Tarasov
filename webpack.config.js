const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: './src/scripts/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public/dist/scripts')
    }
};