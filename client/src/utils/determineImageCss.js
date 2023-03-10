const determineImageCss = (
  imageWidth,
  imageHeight,
  containerWidth,
  containerHeight
) => {
  // let imageWidth = 500;
  // let imageHeight = 500;
  // let containerWidth = 500;
  // let containerHeight = 500;

  // Picture is smaller than container in both and in width
  if (imageWidth <= containerWidth && imageHeight <= containerHeight) {
    if (containerWidth - imageWidth > containerHeight - imageHeight)
      return "height: 100%; width: auto;";
    return "width: 100%; height: auto;";
  }

  // Picture is bigger than container in both and in width
  if (imageWidth > containerWidth && imageHeight > containerHeight) {
    if (imageWidth - containerWidth > imageHeight - containerHeight)
      return "width: 100%; height: auto;";
    return "height: 100%; width: auto;";
  }

  // Picture has more width only
  if (imageWidth > containerWidth) return "width: 100%; height: auto;";

  // Picture has more height only
  if (imageHeight > containerHeight) return "height: 100%; width: auto;";

  return null;
};

export default determineImageCss;
