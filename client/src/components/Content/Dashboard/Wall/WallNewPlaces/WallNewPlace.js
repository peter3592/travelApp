import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDataContext, useUIContext } from "../../../../../store/context";
import fetchAPI from "../../../../../utils/fetchAPI";

export default function WallNewPlace({ place, index }) {
  const [loading, setLoading] = useState(true);

  const { setPlace, reloadData } = useDataContext();
  const { setModal } = useUIContext();

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

  const imageLoadedHandler = () => {
    setTimeout(() => {
      setLoading(false);
    }, [125 * index]);
    setLoading(false);
  };

  return (
    <Div>
      <div className={`recentPlace__container ${loading ? "hide" : ""}`}>
        {/* <div className={`container ${loading ? "hide" : ""}`}> */}
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
              />
            </div>
            <div className="author__name">{place.user.username}</div>
          </div>
        </Link>
        <div className="place">
          <img
            src={place.photoUrl}
            className="place__photo"
            crossorigin="anonymous"
            onClick={placeClickHandler}
          />
        </div>
        {/* </div> */}
      </div>
    </Div>
  );
}

const Div = styled.div`
  /* height: 100%; */

  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */

  .recentPlace__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 1s;
    /* opacity: 1; */
  }

  .hide {
    opacity: 0;
    transform: translateY(1rem);
  }

  .link {
    text-decoration: none;
    color: inherit;

    &:active,
    &:visited {
      color: inherit;
    }
  }

  .author {
    background-color: lavender;
    padding: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;

    &__name {
      font-size: 1.25rem;
    }

    &__photo {
      width: 3rem;
      height: 3rem;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .place {
    height: 8.5rem;
    width: 11.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    transition: 0.25s all;

    :hover {
      transform: scale(1.05);
    }

    &__photo {
      height: 100%;
      cursor: pointer;

      /* overflow: hidden; */
    }
  }
`;
