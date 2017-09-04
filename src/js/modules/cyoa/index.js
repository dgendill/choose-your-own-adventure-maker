import i from './cyoa.js';

var autoloader = require.context('./directives', true, /\.js$/);
autoloader.keys().forEach(function(key) {
  autoloader(key);
});

var autoloader = require.context('./components', true, /\.js$/);
autoloader.keys().forEach(function(key) {
  autoloader(key);
});

var autoloader = require.context('./services', true, /\.js$/);
autoloader.keys().forEach(function(key) {
  autoloader(key);
});



export default i;