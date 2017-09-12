import angular from 'angular';
import L from '../cyoa.js';

L.component('adventureWorkspace', {
  bindings : {
    parts : '<',
    onRemovePart : '&',
    onCopyPart : '&',
    onRemoveChoice : '&',
    onAddChoice : '&'

  },
  template: require('Templates/adventureWorkspace.html'),
  controller : AdventureWorkspaceCtrl
});


function AdventureWorkspaceCtrl($scope, $element, $attrs) {
  var ctrl = this;

  $scope.$watch('workspaceform.$valid', function(isValid) {
    console.log(isValid);
  });

  ctrl.partLinks = function(exclude) {
    return ctrl.parts.map(function(e, index) {
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
    ctrl.onRemovePart({index:index});
  }

  ctrl.copyPart = function(index) {
    ctrl.onCopyPart({index:index});
  }

  ctrl.removeChoice = function(part, index) {
    ctrl.onRemoveChoice({
      part: part,
      index: index
    });
  }

  ctrl.addChoice = function(part) {
    ctrl.onAddChoice({
      part: part
    });
  }
}
