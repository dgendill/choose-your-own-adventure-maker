import angular from 'angular';
import 'Modules/cyoa';
import _ from 'lodash';
import Part from 'Models/Part.js';

export default angular
  .module('appRoutes', ['ui.router', 'cyoa'])
  .config(["$stateProvider", "$compileProvider", function($stateProvider, $compileProvider) {
    
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto|data):/);

    
    $stateProvider.state({
      name: 'root',
      url: '',
      controller: function($scope, $element, Parts, $window, $sce, Storage) {
        
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
                return "[" + quote(c.content) + "] go " + idToString(_.get(c.linksTo, "id"));
              }).join('\n')
            text += "\n---\n";
            text += (element.content || "There is nothing here.");
            return text;
          }).join('\n\n---next---\n\n');
        }

        $scope.createNewProject = function() {
          Storage.saveToCurrentWorkspace(Parts.toJson());
          Storage.createDatedWorkspace();
          Parts.reset();
        }

        $scope.downloadHref = function() {
          let urlBase = "data:text/plain;charset=utf-8,";
          let url = urlBase + encodeURIComponent($scope.view.textStory);
          return $sce.trustAs($sce.URL, url);
        }

        Parts.load(Storage.loadFromCurrentWorkspace());

        $scope.setTextStory();
        
        $window.setInterval(function() {
          Storage.saveToCurrentWorkspace(Parts.toJson());
          $scope.setTextStory();
          $scope.$applyAsync();
        }, 1500);

        $scope.parts = Parts.all;

        $scope.removePart = function(index) {
          Parts.removePart(index);
        }

        $scope.copyPart = function(index) {
          Parts.copyPart(index);
        }

        $scope.removeChoice = function(part, index) {
          part.choices.splice(index, 1);
        }

        $scope.addChoice = function(part) {
          part.choices.push({
            content : '',
            linksTo : null
          });
        }


      },
      template: require('Templates/home.html'),
      resolve: {

      }
    });
  }])
  .run(["$rootScope", function($rootScope) {
    console.log('running');     
  }]);

