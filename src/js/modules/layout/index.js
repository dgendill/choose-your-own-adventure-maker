import i from './layout.js';
let autoloader = require.context('./directives', true, /\.js$/);
autoloader.keys().forEach(function(key) {
  autoloader(key);
});
export default i;