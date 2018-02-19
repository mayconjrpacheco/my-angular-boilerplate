const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin } = require('webpack');
const rxPaths = require('rxjs/_esm5/path-mapping');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];

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
                "loader": "@ngtools/webpack"   
            }
        ]
    },
    "plugins": [
        new NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            "title": "Project",
            "template": "./src/index.ejs",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": false,
            "cache": true,
            "showErrors": true,
            "chunks": "all",
            "excludeChunks": [],
            "title": "Webpack App",
            "xhtml": true,
            "chunksSortMode": function sort(left, right) {
              let leftIndex = entryPoints.indexOf(left.names[0]);
              let rightindex = entryPoints.indexOf(right.names[0]);
              if (leftIndex > rightindex) {
                  return 1;
              }
              else if (leftIndex < rightindex) {
                  return -1;
              }
              else {
                  return 0;
              }
            }
        }),
        new CommonsChunkPlugin({
            "name": [
              "inline"
            ],
            "minChunks": null
        }),
        new CommonsChunkPlugin({
            "name": [
              "vendor"
            ],
            "minChunks": (module) => {
                      return module.resource
                          && (module.resource.startsWith(nodeModules)
                              || module.resource.startsWith(genDirNodeModules)
                              || module.resource.startsWith(realNodeModules));
                  },
            "chunks": [
              "main"
            ]
        }),
        new SourceMapDevToolPlugin({
            "filename": "[file].map[query]",
            "moduleFilenameTemplate": "[resource-path]",
            "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
            "sourceRoot": "webpack:///"
          }),
        new CommonsChunkPlugin({
            "name": [
              "main"
            ],
            "minChunks": 2,
            "async": "common"
        }),
        new AngularCompilerPlugin({
            "mainPath": "src/main.ts",
            "platform": 0,
            "sourceMap": true,
            "tsConfigPath": "./tsconfig.json",
            "skipCodeGeneration": true,
            "compilerOptions": {}
        })
    ],
    "node": {
        "fs": "empty",
        "global": true,
        "crypto": "empty",
        "tls": "empty",
        "net": "empty",
        "process": true,
        "module": false,
        "clearImmediate": false,
        "setImmediate": false
    }
}