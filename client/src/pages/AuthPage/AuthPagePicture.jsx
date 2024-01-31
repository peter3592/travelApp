import { useEffect, useState } from "react";
import useResizeObserver from "use-resize-observer";

import AnimatedText from "./AnimatedText";
import { determineImageCss } from "../../utils";
import { Container } from "./AuthPagePicture.styled";

export default function AuthPagePicture({ image, text, time }) {
  const [imageStyle, setImageStyle] = useState("");

  const {
    ref: imageEl,
    width: imageWidth = 1,
    height: imageHeight = 1,
  } = useResizeObserver();

  const {
    ref: containerEl,
    width: containerWidth = 1,
    height: containerHeight = 1,
  } = useResizeObserver();

  useEffect(() => {
    if (imageWidth > 1 && imageHeight > 1) {
      // Image fully loaded
      const css = determineImageCss(
        imageWidth,
        imageHeight,
        containerWidth,
        containerHeight
      );

      if (css) setImageStyle(css);
    }
  }, [imageWidth, imageHeight, containerWidth, containerHeight]);

  return (
    <>
      <Container ref={containerEl} imageStyle={imageStyle}>
        <div className="picture__container hide">
          <img
            src={image.src}
            className="picture__img"
            crossorigin="anonymous"
            ref={imageEl}
            onLoad={(e) => {
              const parent = e.target.closest(".picture__container");
              setTimeout(() => {
                parent.classList.remove("hide");
              }, 100);
              setTimeout(() => {
                parent.classList.add("hide");
              }, time);
            }}
          />
          <AnimatedText
            text={text}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
          />
        </div>
      </Container>
    </>
  );
}
