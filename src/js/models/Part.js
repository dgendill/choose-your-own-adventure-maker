import angular from 'angular';

class Part {
  constructor() {
    this.id = Part.id();
    this.content = '';
    // Array { content :: String, linksTo :: { id :: ID, label :: String } }
    this.choices = [];
  }

  static id() {
    return Date.now() + "" + performance.now();
  }

  static fromForeign(data) {
    let p = new Part();
    p.id = data.id;
    p.content = data.content;
    p.choices = data.choices;
    return p;
  }

  clone() {
    let p = Part.fromForeign(this);
    p.id = Part.id();
    p.choices = angular.copy(p.choices);
    return p;
  }

}

export default Part;