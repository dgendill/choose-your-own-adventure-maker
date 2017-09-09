import angular from 'angular';
import L from '../cyoa.js';

L.component('loadWorkspace', {
  bindings : {},
  template: require('./loadWorkspace.html'),
  controller : LoadWorkspaceCtrl
});


function LoadWorkspaceCtrl($scope, $element, $attrs, Storage, Parts) {
  var ctrl = this;
  ctrl.data = { name : null };

  ctrl.workspaceName = function() {
    return Storage.niceWorkspaceName(
      Storage.getWorkspace()
    );
  }

  ctrl.loadWorkspace = function() {
    let newWorkspace = Storage.rawWorkspaceName(ctrl.data.name);
    Parts.load(Storage.loadFrom(newWorkspace));
    Storage.setWorkspace(newWorkspace);
    ctrl.closeModal();
  }

  ctrl.closeModal = function() {
    $scope.$parent.closeModal();
  }

  ctrl.workspaces = Storage.viewWorkspaces().map(Storage.niceWorkspaceName);

}
