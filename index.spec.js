Error.stackTraceLimit = Infinity;

require('zone.js/dist/zone.js');
require('zone.js/dist/long-stack-trace-zone.js');
require('zone.js/dist/proxy.js');
require('zone.js/dist/sync-test.js');
require('zone.js/dist/jasmine-patch.js');
require('zone.js/dist/async-test.js');
require('zone.js/dist/fake-async-test.js');
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting());
Object.assign(global, testing);

var testContext = require.context('./src', true, /\.spec\.ts/);
var modules = requireAll(testContext);