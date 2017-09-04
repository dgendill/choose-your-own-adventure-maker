import angular from 'angular';
import 'Modules/cyoa';
import _ from 'lodash';
import Part from 'Models/Part.js';

export default angular
  .module('appRoutes', ['ui.router', 'cyoa'])
  .config(["$stateProvider", function($stateProvider) {
    
    $stateProvider.state({
      name: 'root',
      url: '',
      controller: function($scope, $element, Parts, $window) {
        
        $scope.addNewPart = function() {
          Parts.addNewPart();
        }

        $scope.view = {};

        let idToString = function(id) {
          return ("S"+id).replace('.','dot');
        }

        let quote = function(val) {
          return '"' + val + '"';
        }

        $scope.setTextStory = function() {
          $scope.view.textStory = Parts.all.map(element => {
            let text = "Text " + idToString(element.id) + "\n";
            text += element.choices.map(c => {                
                return "[" + quote(c.content) + "] go " + idToString(c.linksTo.id);
              }).join('\n')
            text += "\n---\n";
            text += (element.content || "There is nothing here.");
            return text;
          }).join('\n\n---next---\n\n');
        }


        Parts.load();
        $scope.setTextStory();
        
        $window.setInterval(function() {
          Parts.save();
          $scope.setTextStory();
          $scope.$applyAsync();
        }, 1500);


      },
      template: require('Templates/home.html'),
      resolve: {

      }
    });
  }])
  .run(["$rootScope", function($rootScope) {
    console.log('running');     
  }]);

