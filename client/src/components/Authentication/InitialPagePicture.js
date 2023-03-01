import { useEffect, useState } from "react";
import styled from "styled-components";
import AnimatedText from "./AnimatedText";
import useResizeObserver from "use-resize-observer";
import determineImageCss from "../../utils/determineImageCss";

export default function InitialPagePicture({ image, text, time }) {
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
      <Div ref={containerEl} imageStyle={imageStyle}>
        <div className="picture__container hide">
          <img
            src={image.src}
            className="picture__img"
            crossorigin="anonymous"
            ref={imageEl}
            onLoad={(e) => {
              const parent = e.target.closest(".picture__container");
              // parent.classList.remove("hide");
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
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;

  /* display: none;
  .visible {
    display: flex !important;
  } */

  .picture__container {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    transition: all 2s;

    /* background-color: bisque; */

    position: relative;
  }

  .hide {
    opacity: 0;
  }

  .picture__img {
    transition: all 2s;
    position: absolute;
    object-fit: cover;
    ${({ imageStyle }) => imageStyle};
    /* width: 100%;
    height: 100%; */
    box-shadow: 0px 0px 15px 10px var(--color-primary);
  }
`;
