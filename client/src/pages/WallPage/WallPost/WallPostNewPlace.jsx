import { useRef, useState } from "react";
import { BiLocationPlus } from "react-icons/bi";

import { useUIContext } from "../../../store/context";
import { determineImageCss } from "../../../utils";
import { Container } from "./WallPostNewPlace.styled";

const photoContainerDimension = 60; // px
const photoContainerDimensionSmall = 45; // px

export default function WallPostNewPlace({
  children,
  placePhoto,
  placeId,
  onPhotoClick,
}) {
  const [imageCss, setImageCss] = useState("");
  const [loading, setLoading] = useState(true);

  const imageRef = useRef();

  const { breakpoints } = useUIContext();

  const imageLoadHandler = () => {
    setImageCss(
      determineImageCss(
        imageRef.current.width,
        imageRef.current.height,
        photoContainerDimension,
        photoContainerDimension
      )
    );

    setLoading(false);
  };

  return (
    <Container
      photoContainerDimension={photoContainerDimension}
      photoContainerDimensionSmall={photoContainerDimensionSmall}
      imageCss={imageCss}
      breakpoints={breakpoints}
    >
      <BiLocationPlus className="icon" />
      <div className="imgContainer">
        <img
          src={placePhoto}
          alt=""
          onLoad={imageLoadHandler}
          ref={imageRef}
          className={loading ? "hide" : ""}
          data-placeid={placeId}
          crossorigin="anonymous"
          onClick={onPhotoClick}
        />
      </div>
      <div className="postContent">{children}</div>
    </Container>
  );
}
