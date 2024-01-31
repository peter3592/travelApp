export const shortenText = (text) =>
  text.length > 25 ? text.slice(0, 23) + "..." : text;
