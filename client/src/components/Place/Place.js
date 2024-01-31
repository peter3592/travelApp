import { useEffect, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { FastAverageColor } from "fast-average-color";

import { useDataContext, useUIContext } from "../../store/context";
import { determineImageCss, newColorShade } from "../../utils";
import PlaceSidebar from "./PlaceSidebar";
import { LoadingPageSpinner } from "../UI";
import { PlaceBackdrop } from "./Place.styled";

export default function Place() {
  const [imageStyle, setImageStyle] = useState("");
  const [containerColor, setContainerColor] = useState(null);
  const [loading, setLoading] = useState(true);

  const { place, setPlace } = useDataContext();
  const { breakpoints } = useUIContext();

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
      containerColor.hex = newColorShade(containerColor.hex, 40);

    setContainerColor(containerColor);
  };

  return (
    <PlaceBackdrop
      className="backdrop"
      onClick={backdropClickHandler}
      imageStyle={imageStyle}
      containerColor={containerColor}
      loading={loading ? 1 : 0}
      breakpoints={breakpoints}
    >
      <>
        {loading && <LoadingPageSpinner />}
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
              {breakpoints.maxWidth800 ? (
                <PlaceSidebar titleColor={containerColor} type="mobile" />
              ) : (
                <PlaceSidebar titleColor={containerColor} type="screen" />
              )}
            </>
          )}
        </div>
      </>
    </PlaceBackdrop>
  );
}
