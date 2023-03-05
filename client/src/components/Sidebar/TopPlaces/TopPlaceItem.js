import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDataContext, useUIContext } from "../../../store/context";
import determineImageCss from "../../../utils/determineImageCss";
import fetchAPI from "../../../utils/fetchAPI";
import Heart from "../../UI/Heart";

const imageContainerWidth = 55;
const imageContainerHeight = imageContainerWidth / 1.46;

export default function TopPlaceItem({ place }) {
  const [imageStyle, setImageStyle] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setPlace, reloadData } = useDataContext();
  const { setModal } = useUIContext();

  const name = place.name;
  const photo = place.smallPhotoUrl;
  const username = place.user.username;
  const likes = place.likes?.length;

  const imageRef = useRef();

  const placeClickHandler = async () => {
    const { ok, data } = await fetchAPI(`api/v1/places/${place._id}`);

    if (!ok) {
      reloadData();
      return setModal({
        type: "error",
        message: "Place does not exists anymore",
      });
    }

    setPlace(data.place);
  };

  useEffect(() => {
    if (
      imageRef.current &&
      imageRef.current.width > 1 &&
      imageRef.current.height > 1
    ) {
      // Image fully loaded
      const css = determineImageCss(
        imageRef.current.width,
        imageRef.current.height,
        imageContainerWidth,
        imageContainerHeight
      );

      if (css) setImageStyle(css);

      setTimeout(() => setLoading(false), [50]);
    }
  }, [
    imageRef.current?.width,
    imageRef.current?.height,
    // imageContainerWidth,
    // imageContainerHeight,
  ]);

  return (
    <Div
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
        <Heart likes={likes} highlighted={true} />
      </div>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  transition: all 1s;
  opacity: ${({ loading }) => (loading ? "0;" : "1;")};
  width: 100%;

  :not(:last-of-type) {
    margin-bottom: 1rem;
  }

  .photo {
    /* width: ${({ imageContainerWidth }) => imageContainerWidth + "px;"}; */
    height: ${({ imageContainerHeight }) => imageContainerHeight + "px;"};

    flex-basis: ${({ imageContainerWidth }) => imageContainerWidth + "px;"};
    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.25s all;

    img {
      ${({ imageStyle }) => imageStyle}
      cursor: pointer;
    }

    :hover {
      transform: scale(1.05);
    }
  }

  .details {
    text-align: left;
    flex-grow: 1;

    .placeName {
      font-size: 1.3rem;
      font-weight: 700;
      text-align: left;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }

    .username {
      font-size: 1rem;
      font-weight: 400;
      text-align: left;
      color: var(--color-darkgray);

      &__link {
        text-decoration: none;
        color: inherit;

        &:active,
        &:visited {
          color: inherit;
        }
      }
    }
  }

  .heartContainer {
    width: 5rem;
    height: 5rem;
  }
`;
