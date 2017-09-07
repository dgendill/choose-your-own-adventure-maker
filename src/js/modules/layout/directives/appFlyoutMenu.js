import angular from 'angular';
import L from '../layout.js';
import sidebar from './appFlyoutMenu.html'

L.directive('appFlyoutMenu', function() {
  return {
    restrict : 'A',
    scope : {},
    compile : function(tElement, tArrs, transclude) {
      return {
        pre : function($scope, element, attrs) {
          var m = element[0].getElementsByClassName('menutoggle')[0];
          var f = element[0].getElementsByClassName('flyout')[0];
          var fm = element[0].getElementsByClassName('flyout-menu')[0];

          fm.addEventListener('click', function(e) {
            // e.stopImmediatePropagation();
          });

          f.addEventListener('click', function() {
            f.classList.remove('is-open');
          });

          m.addEventListener('click', function() {
            if (f.classList.contains('is-open')) {
              f.classList.remove('is-open');
            } else {
              f.classList.add('is-open');
            }
          })
        } 
      }
    }
  }
})