const path = require('path');

module.exports = {

    loaders: [
        {
            test: /\.(glsl|vs|fs)$/,
            loader: 'ts-shader-loader'
        }
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': path.resolve('src'),
        }
    },

};

