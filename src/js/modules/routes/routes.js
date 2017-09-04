import angular from 'angular';
import 'Modules/cyoa';

export default angular
  .module('appRoutes', ['ui.router', 'cyoa'])
  .config(["$stateProvider", function($stateProvider) {
    
    $stateProvider.state({
      name: 'root',
      url: '',
      controller: function($scope, $element, Parts) {
        $scope.parts = Parts.all;
        $scope.addNewPart = Parts.addNewPart;
      },
      template: require('Templates/home.html'),
      resolve: {

      }
    });
  }])
  .run(["$rootScope", function($rootScope) {
    console.log('running');     
  }]);

