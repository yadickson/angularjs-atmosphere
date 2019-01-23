module.exports = function(config) {
    config.set({

        basePath: '',
        // frameworks to use
        frameworks: ['browserify', 'mocha', 'chai', 'sinon'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/mock/jquery.atmosphere.mock.js',
            'src/**/*.js',
            'test/*.js'
        ],

        reporters: ['progress', 'mocha', 'junit', 'coverage', 'istanbul'],

        hostname: 'localhost',

        port: 9000,

        colors: true,

        autoWatch: true,

        browsers: ['PhantomJS'],

        preprocessors: {
            'src/**/*.js': ['coverage']
        },

        coverageReporter: {
            dir: 'coverage',
            reporters: [{
                type: 'html',
                subdir: '.'
            }]
        },

        istanbulReporter: {
            dir: 'coverage',
            reporters: [{
                type: 'lcov',
                subdir: '.'
            }]
        },

        junitReporter: {
            outputDir: 'reports',
            outputFile: 'test-results.xml',
            useBrowserName: false
        }

    });
};
