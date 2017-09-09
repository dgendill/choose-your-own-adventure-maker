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
      appModal: '@',
      appModalHeight: '@'
    },
    compile : function(tElement, tArrs, transclude) {
      return {
        pre : function($scope, element, attrs) {

          $scope.closeModal = function(e) {
            
            if (e == null || $(e.target).hasClass('modal')) {
              $scope.modalElement.remove();
            }            
          }

          function runUsingTemplate(template) {       
            angular.element(element).on('click', function() {

              var modalTemplate = $interpolate(require('Templates/modalWrapper.html'));
              var modalContent = modalTemplate({
                content : template
              });

              var modalElement = (function() {
                var div = document.createElement('div');
                div.innerHTML = modalContent;
                if ($scope.appModalHeight) {
                  $(div.firstChild).children('.modal--inner').height($scope.appModalHeight);
                }
                return div.firstChild;
              }());

              $compile(modalElement)($scope);
              document.body.appendChild(modalElement);
              $scope.modalElement = modalElement;              
              $scope.$apply();

            });

            console.log(template);
          }
          

          if ($scope.appModal.startsWith("url:")) {
            $templateRequest($scope.appModal, false)
              .then(runUsingTemplate, function(err) {
                console.log(err);
              });
          } else {
            runUsingTemplate($scope.appModal);
          }
        },
        post : function($scope, element, attrs) {

        }
      }
    }
  }
}]);