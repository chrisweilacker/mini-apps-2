var path = require('path');

module.exports = {
    entry: "./client/app.jsx",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader"
            }
        ]
    },
    watch: true
}