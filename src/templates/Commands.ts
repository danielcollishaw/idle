export enum COMMANDS {
  Help = "help",
  Clear = "clear",
  Woof = "woof",
}

export enum OUTPUTS {
  Help = "\
    <div>commands</div>\
    <div class='indent'>help</div>\
    <div class='indent'>clear</div>\
    <div class='indent'>woof</div>\
    <div>end of commands</div>\
  ",
  Clear = "clear",
  Woof = "<div>bark bark</div>",
}
