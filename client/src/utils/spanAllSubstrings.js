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
    i = i + index + 6 + 7 + subString.length - 1;
  }

  return parse(string);
};

export default spanAllSubstrings;

// const spanAllSubstrings = (originalString, subString) => {
//   if (!originalString || !subString) return "";

//   console.log("* * * * * * * * * *");

//   let result = "";

//   let string = originalString;

//   let dummy = 1;

//   for (let i = 0; i < originalString.length; i++) {
//     console.log("string", string);
//     string = string.slice(i, Infinity);
//     console.log("string after slice", string);

//     const index = string.toLowerCase().indexOf(subString.toLowerCase());

//     if (index === -1) {
//       result += string;
//       break;
//     }

//     console.log(
//       "originalString.slice(i, i + index)",
//       originalString.slice(i, i + index)
//     );

//     result += originalString.slice(i, i + index);

//     result += `<span>${string.slice(index, index + subString.length)}</span>`;

//     i = index + subString.length - 1;

//     console.log(`Step ${dummy}:`, result);
//     dummy++;
//   }

//   return parse(result);
// };
