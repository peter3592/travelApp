import parse from "html-react-parser";

const spanAllSubstrings = (originalString, subString) => {
  if (!originalString || !subString) return "";

  let string = originalString;

  for (let i = 0; i < string.length; i++) {
    const index = string
      .slice(i)
      .toLowerCase()
      .indexOf(subString.toLowerCase());

    if (index === -1) break;

    string =
      string.slice(0, i + index) +
      "<span>" +
      string.slice(i + index, i + index + subString.length) +
      "</span>" +
      string.slice(i + index + subString.length);

    // 6 = length of <span>
    // 7 = length of </span>
    i = i + index + "<span>".length + "</span>".length + subString.length - 1;
  }

  return parse(string);
};

export default spanAllSubstrings;
