import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import Heart from "../../UI/Heart";
import { useEffect, useState } from "react";
import fetchAPI from "../../../utils/fetchAPI";

export default function UserListItem({ user }) {
  // const [places, setPlaces] = useState(null);
  // const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user.count) setLoading(false);
  // }, [user.count]);

  const imageLoadHandler = () => {
    // setLoading(false);
  };

  return (
    <Div>
      <div className="left">
        <div className="topLevel"></div>
        <div className="photoContainer">
          <img
            src={user.photo}
            alt={`${user.username}'s photo`}
            onLoad={imageLoadHandler}
            crossorigin="anonymous"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "img/anonymousPhoto.jpg";
            }}
          />
        </div>
        <div className="heartContainer" title="Total likes">
          <Heart likes={user.count.likes} highlighted />
          {/* <Heart likes={!loading ? user.count.likes : "\u00A0"} highlighted /> */}
          <div className="heartContainer__title">TOTAL LIKES</div>
        </div>
      </div>
      <div className="right">
        <div className="topLevel">
          <span className="username">{user.username}</span>
        </div>
        <div className="details">
          <div className="countries">
            <div className="title">COUNTRIES</div>
            <div className="value">
              {user.count.countries}
              {/* {!loading ? user.count.countries : "\u00A0"} */}
            </div>
          </div>
          <div className="places">
            <div className="title">PLACES</div>
            <div className="value">
              {user.count.places}
              {/* {!loading ? user.count.places : "\u00A0"} */}
            </div>
          </div>
        </div>
        <Button small onClick={() => navigate("/" + user.username)}>
          SEE MAP
        </Button>
      </div>
    </Div>
  );
}

{
  /* <Link to={`/${user.username}`}>{user.username}</Link> */
}

const Div = styled.li`
  /* font-size: 3rem; */
  display: flex;
  /* width: 25rem; */
  /* height: 17rem; */
  /* height: 9rem; */

  /* margin-bottom: 2rem; */
  /* transition: all 0.2s;
  opacity: ${({ loading }) => (loading ? "0;" : "1;")}; */

  .left {
    /* height: 100%; */
    flex: 0 0 9rem;
    background-color: var(--color-lightgray);
    position: relative;

    .heartContainer {
      width: 6rem;
      height: 6rem;

      /* background-color: red; */

      position: absolute;
      top: 9.25rem;
      right: 0;

      display: flex;
      justify-content: center;
      align-items: center;

      &__title {
        position: absolute;
        bottom: -4px;
        color: var(--color-darkgray);
        font-size: 0.9rem;
      }
    }

    .photoContainer {
      width: 6rem;
      height: 6rem;

      position: absolute;
      top: 1.5rem;
      right: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right {
    flex-grow: 1;
    background-color: var(--color-lightgray);
    text-align: center;
    padding-bottom: 2rem;

    .username {
      font-size: 1.7rem;
      font-family: "Fredoka One";
      letter-spacing: 1px;

      color: white;
      /* font-weight: bold; */

      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 4rem;
    }

    .details {
      padding: 2rem 2rem 1.5rem;
      color: var(--color-primary);
      text-align: center;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;

      .title {
        font-size: 1rem;
        margin-bottom: 0.5rem;
      }

      .value {
        font-size: 1.7rem;
        font-weight: bold;
      }
    }
  }

  .topLevel {
    height: 4.5rem;
    background-color: var(--color-primary);
  }
`;
