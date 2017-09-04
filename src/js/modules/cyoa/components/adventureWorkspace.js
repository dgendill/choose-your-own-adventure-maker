import angular from 'angular';
import L from '../cyoa.js';

L.component('adventureWorkspace', {
  bindings : {
    parts : '='
  },
  template: require('Templates/adventureWorkspace.html'),
  controller : AdventureWorkspaceCtrl
});


function AdventureWorkspaceCtrl($scope, $element, $attrs, Parts) {
  var ctrl = this;

  ctrl.partLinks = function(exclude) {
    console.log(exclude);
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

  ctrl.addChoice = function(part) {
    part.choices.push({
      content : '',
      linksTo : null
    });
  }
}
