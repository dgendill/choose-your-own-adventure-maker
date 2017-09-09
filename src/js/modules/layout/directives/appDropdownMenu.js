'use strict';

import angular from 'angular';
import L from '../layout.js';
import sidebar from './appFlyoutMenu.html'
import $ from 'jquery';


L.directive('appDropdownMenu', function() {
  return {
    restrict : 'A',
    scope : {},
    compile : function(tElement, tArrs, transclude) {
      return {
        pre : function($scope, element, attrs) {
          let parents = element[0].getElementsByClassName('menu--item');

          function closeOthers(submenu) {
            angular.forEach(parents, function(parent) {
              $(parent)
                .children('.menu--item--dropdown')
                .not(submenu)
                .removeClass('visible')
                .find('.visible')
                .removeClass('visible');               
              
            });
          }

          angular.forEach(parents, function(parent) {
            let button = $(parent).children('button');
            let submenu = $(parent).children('.menu--item--dropdown');

            button.on('click', function(e) {
              submenu[0].classList.toggle('visible');
              closeOthers(submenu);
              window.setTimeout(function() {
                $(submenu).find('ul').addClass('visible');
              }, 1);
            });

            $(submenu).find('button').on('click', function() {
              submenu.removeClass('visible');
            });
            
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
              $(parents).find('.visible').removeClass('visible');
            }
          })

        } 
      }
    }
  }
})