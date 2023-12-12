export const parse = (text: string) => {
  const pattern =
    /<div\b[^>]*>((?:(?!<\/?div\b[^>]*>).)*)<\/div>(?=\s*<div\b[^>]*>\s*<br\s*\/>\s*<\/div>)/g;
  const matches = text.match(pattern);
  if (!matches) {
    return new String(text);
  }

  const query = matches[matches.length - 1];
  const result = execute(query.replace(/<\/?div\b[^>]*>/g, ""));

  if (!result) {
    return new String(text);
  }

  if (result == "clear") {
    return new String("<div><br /></div>");
  }

  return new String(
    text.replace("<div><br /></div>", result + "<div><br /></div>")
  );
};

const execute = (query: string) => {
  if (query == "help") {
    return "<div>commands</div><div class='indent'>help</div><div class='indent'>clear</div><div>end of commands</div>";
  } else if (query == "clear") {
    return "clear";
  }

  return "";
};
