export enum COMMANDS {
  Help = "help",
  Clear = "clear",
  Resources = "resources",
  Woof = "woof",
  Buy = "buy",
}

export enum OUTPUTS {
  Help = "\
    <div>commands</div>\
    <div class='indent'>help</div>\
    <div class='indent'>clear</div>\
    <div class='indent'>resources</div>\
    <div class='indent'>woof</div>\
    <div>end of commands</div>\
  ",
  Clear = "clear",
  ResourcesOpen = "<div>build em' up</div>",
  ResourcesClose = "<div>break em' down</div>",
  Woof = "<div>bark bark</div>",
}

export enum ITEMS {
  Dog = "dog",
}
