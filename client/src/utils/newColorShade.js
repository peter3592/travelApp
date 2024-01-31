export const newColorShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace(`#`, ``);

  if (hexColor.length !== 6) return hexColor;

  const decimalColor = parseInt(hexColor, 16);

  let red = (decimalColor >> 16) + magnitude;
  red > 255 && (red = 255);
  red < 0 && (red = 0);

  let green = (decimalColor & 0x0000ff) + magnitude;
  green > 255 && (green = 255);
  green < 0 && (green = 0);

  let blue = ((decimalColor >> 8) & 0x00ff) + magnitude;
  blue > 255 && (blue = 255);
  blue < 0 && (blue = 0);

  return `#${(green | (blue << 8) | (red << 16)).toString(16)}`;
};
