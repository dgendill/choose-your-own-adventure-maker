import angular from 'angular';
import L from '../cyoa.js';

L.component('saveWorkspace', {
  bindings : {},
  template: require('./saveWorkspace.html'),
  controller : SaveWorkspaceCtrl
});


function SaveWorkspaceCtrl($scope, $element, $attrs, Storage) {
  var ctrl = this;
  

  ctrl.workspaceName = function() {
    return Storage.niceWorkspaceName(
      Storage.getWorkspace()
    );
  }

  ctrl.data = {
    name : '',
    chosenExistingWorkspace : ctrl.workspaceName()
  };

  ctrl.setWorkspaceName = function() {
    ctrl.data.name = ctrl.data.chosenExistingWorkspace
  }

  ctrl.saveWorkspace = function() {
    Storage.createWorkspace(ctrl.data.name);
    ctrl.closeModal();
  }

  ctrl.closeModal = function() {
    $scope.$parent.closeModal();
  }

  ctrl.workspaces = Storage.viewWorkspaces().map(Storage.niceWorkspaceName);

}
