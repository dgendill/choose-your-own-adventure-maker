import angular from 'angular';
import angularCookies from 'angular-cookies';

let appModules = [];
let requireTest = require.context('./modules', true, /\/index\.js$/);

requireTest.keys().forEach(function(key) {
  appModules.push(requireTest(key).default.name);  
});

import uirouter from '@uirouter/angularjs';

window.addEventListener('load', function() {
  angular.element(function() {
    
    let deps = appModules.concat([
      "ngCookies"
    ]);

    angular.bootstrap(
      document.getElementById('myApp'),
      deps
    );
  })
})
