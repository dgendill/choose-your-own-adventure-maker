import angular from 'angular';
import L from '../layout.js';
import $ from 'jquery';

L.directive('appMenuDropdown', ['$compile', function($compile) {
  return {
    restrict : 'A',
    scope : {},
    compile : function(tElement, tArrs, transclude) {
      return {
        pre : function($scope, element, attrs) {
          
          let parents = [element[0]];

          $(element).find(".app-button").on('click', function() {
            $(element).toggleClass('visible');
          });

          $(document).on('click', function(e) {

            function everyElement(parents) {
              return {
                doesNotContain : function(e) {
                  return Array.prototype.every.call(parents, function(parent) {
                    return parent.contains(e) === false;
                  });
                }
              }
            }

            if (everyElement(parents).doesNotContain(e.target)) {
              $(parents).removeClass('visible').find('.visible').removeClass('visible');
            }
          })
        } 
      }
    }
  }
}])