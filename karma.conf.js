module.exports = (config) => {
    config.set({
        basPath: '',
        frameworks: ['jasmine'],
        reporters: ['progress'],
        preprocessors: {'./index.spec.js': ['webpack']},
        webpack: require('./webpack.config.js'),
        files: [
            { pattern: './index.spec.js', watched: true }
        ],
        client:{
            clearContext: false
        },
        port: 9876,
        colors: true,
        autoWatch: true,
        logLevel: config.LOG_INFO,
        browsers: ['Chrome'],
        singleRun: false
    })
}