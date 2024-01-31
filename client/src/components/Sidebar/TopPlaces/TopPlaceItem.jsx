import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useDataContext } from "../../../store/context";
import { determineImageCss } from "../../../utils";
import { Heart } from "../../UI";
import { Container } from "./TopPlaceItem.styled";

const imageContainerWidth = 55;
const imageContainerHeight = imageContainerWidth / 1.46;

export default function TopPlaceItem({ place }) {
  const [imageStyle, setImageStyle] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setPlace } = useDataContext();

  const name = place.name;
  const photo = place.smallPhotoUrl;
  const username = place.user.username;
  const likes = place.likes?.length;

  const imageRef = useRef();

  const placeClickHandler = () => setPlace(place);

  useEffect(() => {
    if (imageRef.current) {
      // Image fully loaded
      const css = determineImageCss(
        imageRef.current.width,
        imageRef.current.height,
        imageContainerWidth,
        imageContainerHeight
      );

      if (css) setImageStyle(css);
      setLoading(false);
    }
  }, [imageRef.current]);

  return (
    <Container
      imageStyle={imageStyle}
      imageContainerWidth={imageContainerWidth}
      imageContainerHeight={imageContainerHeight}
      loading={loading ? 1 : 0}
    >
      <div className="photo">
        <img
          src={photo}
          alt={photo.name}
          ref={imageRef}
          crossorigin="anonymous"
          onClick={placeClickHandler}
        />
      </div>
      <div className="details">
        <div className="placeName" onClick={placeClickHandler}>
          {name}
        </div>
        <div className="username">
          <Link to={`/${username}`} className="username__link">
            {username}
          </Link>
        </div>
      </div>
      <div className="heartContainer">
        <Heart likes={likes} highlighted noPointer />
      </div>
    </Container>
  );
}
