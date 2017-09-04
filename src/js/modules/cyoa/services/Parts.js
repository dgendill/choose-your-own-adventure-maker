import L from '../cyoa.js';
import Part from 'Models/Part.js';
import angular from 'angular';

L.service("Parts", function() {
  const self = this;

  this.addNewPart = function() {
    self.all.push(new Part());
  }

  this.removePart = function(index) {
    self.all.splice(index, 1);
  }

  this.save = function() {
    window.localStorage.setItem('Story', angular.toJson(self.all));
  }

  this.load = function() {
    self.all.length = 0;
    [].push.apply(self.all, (JSON.parse(window.localStorage.getItem('Story')) || self.defaultParts).map(Part.fromForeign));
    

    // const old = self.all;
    // console.log(self.all);
    // [].splice.apply(self.all, [0, self.all.length].concat(
    //   JSON.parse(window.localStorage.getItem('Story')).map(Part.fromForeign)
    // ));
    // const n = self.all;
    // console.log(self.all);
    // console.log(old === n);

  }

  this.defaultParts = [new Part(), new Part()]
  this.all = [];

});