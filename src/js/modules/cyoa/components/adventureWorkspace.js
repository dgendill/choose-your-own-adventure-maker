import angular from 'angular';
import L from '../cyoa.js';

L.component('adventureWorkspace', {
  bindings : {},
  template: require('Templates/adventureWorkspace.html'),
  controller : AdventureWorkspaceCtrl
});


function AdventureWorkspaceCtrl($scope, $element, $attrs, Parts) {
  var ctrl = this;
  ctrl.parts = Parts.all;

  $scope.$watch('workspaceform.$valid', function(isValid) {
    console.log(isValid);
  });

  ctrl.partLinks = function(exclude) {
    
    return Parts.all.map(function(e, index) {
      return {
        label : ("Part " + index),
        id : e.id
      }
    })
    .filter(function(e) {
      return e.id !== exclude.id;
    });
  }

  ctrl.removePart = function(index) {
    Parts.removePart(index);

    part.choices.push({
      content : '',
      linksTo : null
    });
  }

  ctrl.removeChoice = function(choices, index) {
    choices.splice(index, 1);
  }

  ctrl.addChoice = function(part) {
    part.choices.push({
      content : '',
      linksTo : null
    });
  }
}
