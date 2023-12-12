import { useResourceStore } from "../scripts/Resources";
import { COMMANDS, OUTPUTS } from "../templates/Commands";

export const parse = (text: string) => {
  const pattern =
    /<div\b[^>]*>((?:(?!<\/?div\b[^>]*>).)*)<\/div>(?=\s*<div\b[^>]*>\s*<br\s*\/>\s*<\/div>)/g;
  const matches = text.match(pattern);
  if (!matches) {
    return new String(text);
  }

  const query = matches[matches.length - 1];
  const result = execute(query.replace(/<\/?div\b[^>]*>/g, ""));

  if (result == "clear") {
    return new String("<div><br /></div>");
  }

  return replaceLastInstance(text, "<div><br /></div>", result);
};

const execute = (query: string) => {
  if (query === COMMANDS.Help) {
    return OUTPUTS.Help;
  } else if (query === COMMANDS.Clear) {
    return OUTPUTS.Clear;
  } else if (query === COMMANDS.Woof) {
    useResourceStore.getState().addToBark(1);
    return OUTPUTS.Woof;
  }
  if (query.match("invalid command") || query.match("<br />")) {
    return "";
  }

  return "<div>invalid command</div>";
};

const replaceLastInstance = (dirty: string, pattern: string, clean: string) => {
  const charpos = dirty.lastIndexOf(pattern);
  if (charpos < 0) {
    return dirty;
  }

  const ptone = dirty.substring(0, charpos);
  const pttwo = dirty
    .substring(charpos)
    .replace(pattern, `${clean}<div><br /></div>`);
  return ptone + pttwo;
};
