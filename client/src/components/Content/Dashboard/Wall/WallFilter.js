import { DivIcon } from "leaflet";
import { useEffect, useReducer } from "react";
import styled from "styled-components";
import { BsFillCheckCircleFill } from "react-icons/bs";

const reducer = (state, action) => {
  if (
    action.type === "like" ||
    action.type === "comment" ||
    action.type === "newPlace"
  )
    return {
      ...state,
      [action.type]: !state[action.type],
    };

  return state;
};

export default function WallFilter({ setFilteredItems }) {
  const [state, dispatch] = useReducer(reducer, {
    like: true,
    comment: true,
    newPlace: true,
  });

  useEffect(() => {
    setFilteredItems(state);
  }, [state]);

  return (
    <Div>
      <p className="title">Filter</p>
      <div className={`filter ${state.newPlace ? "filter--newPlaces" : ""}`}>
        <input
          type="checkbox"
          id="filterNewPlaces"
          checked={state.newPlace}
          onChange={() => dispatch({ type: "newPlace" })}
        />
        <label
          htmlFor="filterNewPlaces"
          className={`filter__icon ${
            state.newPlace ? "filter__icon--active" : ""
          }`}
        >
          <BsFillCheckCircleFill />
        </label>
        <label className="filter__text" htmlFor="filterNewPlaces">
          NEW PLACES
        </label>
      </div>
      <div className={`filter ${state.comment ? "filter--comments" : ""}`}>
        <input
          type="checkbox"
          id="filterComments"
          checked={state.comment}
          onChange={() => dispatch({ type: "comment" })}
        />
        <label
          htmlFor="filterComments"
          className={`filter__icon ${
            state.comment ? "filter__icon--active" : ""
          }`}
        >
          <BsFillCheckCircleFill />
        </label>
        <label className="filter__text" htmlFor="filterComments">
          COMMENTS
        </label>
      </div>
      <div className={`filter ${state.like ? "filter--likes" : ""}`}>
        <input
          type="checkbox"
          id="filterLikes"
          checked={state.like}
          onChange={() => dispatch({ type: "like" })}
        />
        <label
          htmlFor="filterLikes"
          className={`filter__icon ${state.like ? "filter__icon--active" : ""}`}
        >
          <BsFillCheckCircleFill />
        </label>
        <label className="filter__text" htmlFor="filterLikes">
          LIKES
        </label>
      </div>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;

  font-family: "Fredoka One";
  letter-spacing: 0.5px;
  font-size: 1.4rem;

  margin-bottom: 3rem;
  /* height: 2rem; */

  .title {
    color: var(--color-gray);
  }

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    /* gap: 0.5rem; */
    color: var(--color-lightgray);

    transition: 0.3s all;

    /* margin-bottom: 2rem; */

    &__text {
      cursor: pointer;
      padding-left: 0.5rem;
    }

    &__icon {
      transition: 0.2s all;
      transform: scale(0);

      display: flex;
      justify-content: center;
      align-items: center;
      /* cursor: default; */

      &--active {
        transform: scale(1);
        cursor: pointer;
      }
    }

    input {
      display: none;
    }

    /* label {
      cursor: inherit;
    } */

    &--newPlaces {
      color: var(--color-primary);
    }

    &--comments {
      color: #02ca2e;
    }

    &--likes {
      color: #fa00ff;
    }
  }
`;
