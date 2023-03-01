import styled from "styled-components";
import PlaceComment from "./PlaceComment";
import PlaceCommentsList from "./PlaceCommentsList";
import { FaRegTimesCircle } from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import {
  useAuthContext,
  useDataContext,
  useUIContext,
} from "../../store/context";
import { useState } from "react";
import Moment from "react-moment";
import Heart from "../UI/Heart";
import fetchAPI from "../../utils/fetchAPI";
import { useNavigate } from "react-router-dom";

export default function PlaceSidebar({ titleColor }) {
  const [commentText, setCommentText] = useState("");
  const [placeLiked, setPlaceLiked] = useState(false);

  const { place, setPlace, reloadPlace, reloadData } = useDataContext();
  const { currentUser } = useAuthContext();
  const { setModal } = useUIContext();

  const navigate = useNavigate();

  const placeExists = async () => {
    const { ok } = await fetchAPI(`api/v1/places/${place._id}`);

    if (!ok) {
      setPlace(null);
      setModal({
        type: "error",
        message: "Place does not exists anymore",
      });
      await reloadData();

      return false;
    }

    return true;
  };

  const likePlace = async () => {
    const { ok } = await fetchAPI(`api/v1/places/${place._id}/like`, "PATCH");

    if (!ok) {
      const exists = await placeExists();

      if (exists) setModal({ type: "error", message: "Liking place error" });

      return;
    }

    setPlaceLiked(true);

    reloadPlace();
    reloadData();
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (!commentText)
      return setModal({ type: "error", message: "Comment cannot be empty" });

    const { ok } = await fetchAPI("api/v1/comments/", "POST", {
      placeId: place._id,
      text: commentText,
    });

    setCommentText("");

    if (!ok) {
      const exists = await placeExists();

      if (exists) setModal({ type: "error", message: "Posting comment error" });

      return;
    }

    // setModal({ type: "success", message: "Comment published" });

    reloadPlace();
    reloadData();
  };

  const userClickHandler = () => {
    setPlace(null);
    navigate(`/${place.user.username}`);
  };

  return (
    <Div className="container__sidebar" titleColor={titleColor}>
      <FaRegTimesCircle className="exitIcon" onClick={() => setPlace(null)} />
      <div className="helperBox">
        <div className="sectionTop">
          <div className="user">
            <div className="user__photo">
              <img
                src={place.user.photo}
                alt={`${place.user.username}'s photo`}
                onClick={userClickHandler}
                crossorigin="anonymous"
              />
            </div>
            <div className="user__details">
              <div className="user__name" onClick={userClickHandler}>
                {place.user.username}
              </div>
              <Moment className="user__date" format="DD.MM.YYYY, HH:mm">
                {place.createdAt}
              </Moment>
            </div>
          </div>
          <p className="place__name">{place.name}</p>
          {place?.description && (
            <p className="place__description">{place.description}</p>
          )}
        </div>
        <div className="heartContainer">
          <Heart
            likes={place.likes.length}
            size="big"
            highlighted={place.likes.includes(currentUser._id)}
            placeLiked={placeLiked}
            onClick={likePlace}
            className="heart"
          />
        </div>
        <div className="sectionComments">
          <form onSubmit={addComment} className="form">
            <input
              type="text"
              placeholder="Write comment ..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              id="placeImage"
              className="comment"
            />
            <div className="addCommentIcon">
              <button type="submit">
                <RiSendPlane2Fill className="icon" />
              </button>
            </div>
          </form>
          <PlaceCommentsList comments={place.comments} />
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  background-color: green;
  width: 30%;
  height: 100%;
  position: relative;
  color: white; /* width: 35rem; */
  background-color: var(--color-primary);
  padding: 3rem;
  /* max-width: 30rem; */
  min-width: 22rem;

  display: flex;
  flex-direction: column;
  /* justify-content: space-between;
  justify-content: flex-start;
  align-items: stretch; */

  .sectionTop {
    flex: 0 1 auto;
  }

  .exitIcon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    /* color: white; */
    font-size: 2.5rem;
    cursor: pointer;
  }

  .helperBox {
    display: contents;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    &__details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    &__name {
      font-size: 1.4rem;
      font-weight: 700;
      cursor: pointer;

      &__link {
        text-decoration: none;

        &:visited,
        &:active {
          color: inherit;
        }
      }
    }

    &__date {
      color: var(--color-gray);
    }

    &__photo {
      width: 4rem;
      height: 4rem;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .place {
    &__name {
      width: calc(100% + 2 * 3.1rem);
      transform: translateX(-3.2rem);
      letter-spacing: 2px;
      font-family: "Fredoka One", bold;
      background-color: ${({ titleColor }) =>
        titleColor ? titleColor.hex : ""};
      text-align: center;
      /* font-size: 2.2rem; */
      font-size: 2rem;
      padding: 1.7rem 1rem;
      color: ${({ titleColor }) =>
        titleColor?.isDark ? "white;" : "var(--color-primary)"};
    }

    &__description {
      font-size: 1.4rem;
      font-size: 500;
      /* color: var(--color-lightgray); */
      color: white;
      margin-top: 1.5rem;
    }
  }

  form {
    position: relative;
    display: flex;
    background-color: var(--color-lightgray);
  }

  input.comment {
    width: 100%;
    padding: 1rem 1.2rem;
    padding-right: 0.5rem;
    border: 0;
    outline: none;
    color: black;
    background-color: var(--color-lightgray);

    :-webkit-autofill {
      -webkit-background-clip: text;
      background-clip: text;
    }

    ::placeholder {
      color: var(--color-darkgray);
    }
  }

  .addCommentIcon {
    color: var(--color-primary);
    background-color: var(--color-lightgray);

    position: relative;

    cursor: pointer;

    overflow: hidden;

    height: 100%;
    aspect-ratio: 1 / 1;

    border: none;
    padding: 0;
    margin: 0;
    outline: inherit;

    display: flex;
    justify-content: center;
    align-items: center;

    button {
      height: 140%;
      aspect-ratio: 1 / 1;
      cursor: pointer;

      background-color: var(--color-lightgray);

      transition: all 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      color: var(--color-primary);

      .icon {
        font-size: 1.9rem;
      }

      :hover {
        transform: scale(1) rotate(90deg);
        color: var(--color-secondary);
      }

      :active {
        transform: scale(1) rotate(90deg) translateX(5px);
      }
    }
  }

  .sectionComments {
    display: flex;
    flex-direction: column;

    /* background-color: yellow; */
    flex: 1 1 auto;
    /* height: 10rem; */
    /* align-items: center; */

    overflow-y: auto;

    .form {
      margin-bottom: 1.5rem;
    }
  }

  .heart {
    align-self: center;
  }

  .heartContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 0;
    flex: 0 1 auto;
  }
`;
