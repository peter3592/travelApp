import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDataContext } from "../../store/context";
import useResizeObserver from "use-resize-observer";

import { FastAverageColor } from "fast-average-color";
import PlaceSidebar from "./PlaceSidebar";
import LoadingSpinner from "../UI/LoadingSpinner";
import determineImageCss from "../../utils/determineImageCss";

const newShade = (hexColor, magnitude) => {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
};

export default function Place() {
  const [imageStyle, setImageStyle] = useState("");
  // const [imageLoaded, setImageLoaded] = useState(false);
  const [containerColor, setContainerColor] = useState(null);
  const [loading, setLoading] = useState(true);

  const { place, setPlace } = useDataContext();

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

      setTimeout(() => {
        setLoading(false);
      }, [250]);
    }

    //imageLoaded
  }, [imageWidth, imageHeight, containerWidth, containerHeight]);

  const backdropClickHandler = (e) => {
    if (!e.target.classList.contains("backdrop")) return;
    setPlace(null);
  };

  const imageLoadedHandler = async (e) => {
    const img = e.target;

    const fac = new FastAverageColor();
    let containerColor = await fac.getColorAsync(img);

    if (containerColor.isLight)
      containerColor.hex = newShade(containerColor.hex, 40);

    setContainerColor(containerColor);

    // setImageLoaded(true);

    // setTimeout(() => setLoading(false), 50);

    // it was here
    // setLoading(false);
  };

  return (
    <Backdrop
      className="backdrop"
      onClick={backdropClickHandler}
      imageStyle={imageStyle}
      containerColor={containerColor}
      loading={loading ? 1 : 0}
      // imageWidth={imageWidth}
      // determineImageCss={determineImageCss}
    >
      <>
        {loading && <LoadingSpinner />}
        <div className={`container ${loading ? "hide" : ""}`}>
          {place && (
            <>
              <div className="container__photo" ref={containerEl}>
                <img
                  src={place.photoUrl}
                  alt={place.name}
                  id="photoImg"
                  onLoad={imageLoadedHandler}
                  ref={imageEl}
                  crossorigin="anonymous"
                  className={loading ? "hide" : ""}
                />
              </div>
              <PlaceSidebar titleColor={containerColor} />
            </>
          )}
        </div>
      </>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  padding: 4rem;

  .container {
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    transition: 0.3s opacity;

    opacity: ${({ loading }) => (loading ? "0;" : "1;")};

    &__photo {
      background: ${({ containerColor }) => {
        if (!containerColor) return "";

        return `linear-gradient(
        90deg,
        ${newShade(containerColor.hex, containerColor.isLight ? -40 : 40)} 15%,
        ${containerColor.hex} 100%
      );`;
      }};

      padding: 3rem;

      width: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      img {
        object-fit: cover;
        transition: 0.6s all;
        /* height: 100%; */
        ${({ imageStyle }) => imageStyle}
      }
    }
  }

  .hide {
    opacity: 0;
    transform: scale(0.4);
  }
`;
