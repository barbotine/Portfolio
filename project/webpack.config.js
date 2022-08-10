const path = require('path');

module.exports = {

    loaders: [
        {
            test: /\.(glsl|vs|fs)$/,
            loader: 'ts-shader-loader'
        }
    ]

};

