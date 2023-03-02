import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import fetchAPI from "../../../utils/fetchAPI";

export default function SidebarUser() {
  const [user, setUser] = useState(null);
  const [places, setPlaces] = useState(null);

  const params = useParams();

  useEffect(() => {
    (async () => {
      const username = params.username;

      const { ok: userOk, data: dataUser } = await fetchAPI(
        `api/v1/users/${username}`
      );

      const { ok: placesOk, data: dataPlaces } = await fetchAPI(
        `api/v1/users/${username}/places`
      );

      if (userOk && placesOk) {
        setUser(dataUser.user);
        setPlaces(dataPlaces.places);
      }
    })();
  }, [params]);

  const calcCountries = () => {
    const countries = new Set();

    places.forEach((place) => countries.add(place.country.name));

    return countries.size;
  };

  return (
    <Div>
      {user && places && (
        <>
          <div className="user">
            <div className="photo">
              <img
                src={user.photo}
                crossorigin="anonymous"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "img/anonymousPhoto.jpg";
                }}
              />
            </div>
            <div className="username">{user.username}</div>
          </div>
          <div className="stats">
            <div className="stats__countries">
              <div className="stats__icon">
                <FaGlobeAmericas />
              </div>
              <div className="stats__details">
                <div className="stats__title">COUNTRIES</div>
                <div className="stats__number">{calcCountries()}</div>
              </div>
            </div>
            <div className="stats__places">
              <div className="stats__icon">
                <IoMdPin />
              </div>
              <div className="stats__details">
                <div className="stats__title">PLACES</div>
                <div className="stats__number">{places.length}</div>
              </div>
            </div>
          </div>
          {/* <TopPlaces username={user.username} /> */}
        </>
      )}
    </Div>
  );
}

const Div = styled.div`
  /* color: white; */
  /* width: 100%;
  height: 100%; */
  width: 100%;
  flex-grow: 1;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  .photo {
    text-align: center;
    border-radius: var(--border-radius);
    overflow: hidden;
    width: 16rem;
    height: 16rem;
    margin: 0 auto 0.5rem;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .user .username {
    color: white;
    text-align: center;
    font-weight: 700;
    font-size: 2.9rem;
  }

  .stats {
    color: white;
    text-align: center;

    &__title {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    &__number {
      font-size: 3.6rem;
      font-weight: 700;
    }

    &__countries,
    &__places {
      display: flex;
      align-items: center;
      justify-content: center;
      /* width: 13rem; */
      margin: 0 auto;
      padding: 2rem 1rem;
      width: 90%;

      /* background-color: bisque; */

      /* flex-grow: 1; */
    }

    &__countries {
      border-bottom: 3px solid white;
    }

    &__icon {
      font-size: 3.5rem;
      transform: translateY(13px);
    }

    &__icon,
    &__details {
      width: 8rem;
    }
  }
`;
