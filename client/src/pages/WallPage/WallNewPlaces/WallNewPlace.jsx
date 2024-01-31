import { useState } from "react";
import { Link } from "react-router-dom";

import { useDataContext, useUIContext } from "../../../store/context";
import { Container } from "./WallNewPlace.styled";
import { usePlace } from "../../../api/hooks/usePlace";

export default function WallNewPlace({ place, index }) {
  const [loading, setLoading] = useState(true);

  const { setPlace } = useDataContext();
  const { setModal } = useUIContext();

  const { refetch } = usePlace(place._id);

  const placeClickHandler = async () => {
    const { data: refetchedPlace } = await refetch();

    if (!refetchedPlace)
      return setModal({
        type: "error",
        message: "Loading place error. Try it later",
      });

    setPlace(refetchedPlace);
  };

  const imageLoadedHandler = () => {
    setTimeout(() => {
      setLoading(false);
    }, [125 * index]);
  };

  return (
    <Container>
      <div className={`recentPlace__container ${loading ? "hide" : ""}`}>
        <Link to={`/${place.user.username}`} className="link">
          <div className="author">
            <div className="author__photo">
              <img
                src={place.user.photo}
                onLoad={imageLoadedHandler}
                crossorigin="anonymous"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "img/anonymousPhoto.jpg";
                }}
                alt={`Photo of ${place.user.username}`}
              />
            </div>
            <div className="author__name">{place.user.username}</div>
          </div>
        </Link>
        <div className="place">
          <img
            src={place.smallPhotoUrl}
            className="place__photo"
            crossorigin="anonymous"
            onClick={placeClickHandler}
            alt={`Photo of ${place.name}`}
          />
        </div>
      </div>
    </Container>
  );
}
