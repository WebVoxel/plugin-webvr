const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.ts',
    output: {
        filename: 'webvoxel-plugin-webvr.min.js',
        path: buildPath,
        library: 'Voxel',
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
            },
        ],
    },
    externals: {
        three: {
            root: 'THREE',
            commonjs2: 'three',
            commonjs: 'three',
            amd: 'three',
        },
        '@webvoxel/core': {
            root: 'Voxel',
            commonjs2: '@webvoxel/core',
            commonjs: '@webvoxel/core',
            amd: '@webvoxel/core',
        },
    },
};
