import L from '../cyoa.js';
import Part from 'Models/Part.js';
import angular from 'angular';

L.service("Parts", function() {
  const self = this;

  this.reset = function() {
    this.load(angular.toJson(this.defaultParts));
  }

  this.addNewPart = function() {
    self.all.push(new Part());
  }

  this.removePart = function(index) {
    self.all.splice(index, 1);
  }

  this.copyPart = function(index) {
    self.all.splice(index+1, 0, self.all[index].clone());
  }

  this.save = function() {
    window.localStorage.setItem('Story', angular.toJson(self.all));
  }

  // StringifiedJSON -> Eff
  this.load = function(data) {
    self.all.length = 0;
    [].push.apply(self.all, (angular.fromJson(data) || self.defaultParts).map(Part.fromForeign));
  }

  this.defaultParts = [new Part(), new Part()]
  this.all = [];

  this.toJson = function() {
    return angular.toJson(this.all);
  }

});