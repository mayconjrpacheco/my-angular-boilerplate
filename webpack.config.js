const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const rxPaths = require('rxjs/_esm5/path-mapping');

module.exports = {
    "entry": {
        "main": [
            "./src/main.ts"
        ],
        "polyfills": [
            "./src/polyfills.ts"
        ]
    },
    "output": {
        "path": path.join(process.cwd(), "dist"),
        "filename": "[name].bundle.js",
        "chunkFilename": "[id].chunk.js",
        "crossOriginLoading": false
    },
    "cache": true,
    "devtool": "heap-module-source-map",
    "resolve": {
        "alias": {
          "core": path.resolve(__dirname, './src/core'),
          "state": path.resolve(__dirname, './src/state'),
          "modules": path.resolve(__dirname, './src/modules')
        },
        "modules": [path.resolve(__dirname, 'node_modules')],
        "extensions": ['.ts', '.js']
    },
    "module": {
        "loaders": [
            { "test": /\.html$/, "loader": "raw-loader" },
            { "test": /\.(png|svg|woff|woff2|ttf|eot)/, "loader": 'file-loader' },
            { "test": /\.(css|scss)$/,
              "use": [
                { "loader": 'css-to-string-loader' },
                { "loader": 'style-loader' },
                { "loader": 'css-loader' },
                { "loader": 'sass-loader',
                    "options": {
                        "data": '@import "variables";',
                        "includePaths": [path.resolve(__dirname, './src/core/style/')]
                    }
                }]
            },
            { 
                "test": /\.ts$/, 
                "loader": "@ngtools/webpack", 
                "exclude": /node_modules/,
                "options": {
                    "tsConfigPath": "./tsconfig.json"
                }     
            }
        ]
    },
    "plugins": [
        new HtmlWebpackPlugin({
            "title": "Project",
            "template": "./src/index.ejs"
        }),
        new webpack.ContextReplacementPlugin(
            /(.+)?angular(\\|\/)core(.+)?/, 
            path.resolve(__dirname, './src'),
            {}
        )
    ]
}