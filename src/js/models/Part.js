class Part {
  constructor() {
    this.id = Date.now() + "" + performance.now();
    this.content = '';
    // Array { content :: String, linksTo :: { id :: ID, label :: String } }
    this.choices = [];
  }

  static fromForeign(data) {
    let p = new Part();
    p.id = data.id;
    p.content = data.content;
    p.choices = data.choices;
    return p;
  }

}

export default Part;