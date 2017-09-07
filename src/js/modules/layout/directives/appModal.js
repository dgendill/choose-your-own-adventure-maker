'use strict';

import angular from 'angular';
import L from '../layout.js';
import sidebar from './appFlyoutMenu.html'
import $ from 'jquery';

L.directive('appModal', ["$templateRequest", "$compile", "$interpolate",
function($templateRequest, $compile, $interpolate) {
  return {
    restrict : 'A',
    scope : {
      appModal: '@'
    },
    compile : function(tElement, tArrs, transclude) {
      return {
        pre : function($scope, element, attrs) {

          $scope.closeModal = function() {
            $scope.modalElement.remove();
          }

          $templateRequest($scope.appModal, false)
            .then(function(template) {
              
              angular.element(element).on('click', function() {

                var modalTemplate = $interpolate(require('Templates/modalWrapper.html'));
                var modalContent = modalTemplate({
                  content : template
                });

                var modalElement = (function() {
                  var div = document.createElement('div');
                  div.innerHTML = modalContent;
                  return div.firstChild;
                }());

                document.body.appendChild(modalElement);
                $scope.modalElement = modalElement;
                $compile(modalElement)($scope);

              });

              console.log(template);
            }, function(err) {
              console.log(err);
            });
        },
        post : function($scope, element, attrs) {

        }
      }
    }
  }
}]);