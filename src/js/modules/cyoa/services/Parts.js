import L from '../cyoa.js';

class Part {
  constructor() {
    this.id = performance.now();
    this.content = '';
    // Array { label :: String, id :: ID }
    this.choices = [];
  }  
}

L.service("Parts", function() {
  this.addNewPart = function() {
    this.parts.push(new Part());
  }

  this.removePart = function(index) {
    this.parts.splice(index, 1);
  }

  this.all = [new Part(), new Part()]
});