// import { DivIcon } from "leaflet";
import { useEffect, useReducer } from "react";
import styled from "styled-components";
import { AiOutlineArrowDown } from "react-icons/ai";

const reducer = (state, action) => {
  if (action.category === state.category)
    return {
      category: state.category,
      descending: !state.descending,
    };

  if (state.category !== "name" && action.category === "name")
    return {
      category: "name",
      descending: false,
    };

  return {
    category: action.category,
    descending: true,
  };
};

export default function UsersSort({ onSortChange }) {
  const [state, dispatch] = useReducer(reducer, {
    category: "likes",
    descending: true,
  });

  useEffect(() => {
    onSortChange(state.category, state.descending);
  }, [state]);

  let likesIconClasses = "filter__icon";
  let nameIconClasses = "filter__icon";
  let placesIconClasses = "filter__icon";

  if (state.category === "likes")
    likesIconClasses += state.descending
      ? " filter__icon--active"
      : " filter__icon--active filter__icon--active--asc";

  if (state.category === "name")
    nameIconClasses += state.descending
      ? " filter__icon--active"
      : " filter__icon--active filter__icon--active--asc";

  if (state.category === "places")
    placesIconClasses += state.descending
      ? " filter__icon--active"
      : " filter__icon--active filter__icon--active--asc";

  return (
    <Div>
      <p className="title">Sort</p>
      <div
        className={`filter ${
          state.category === "likes" ? "filter--active" : ""
        }`}
      >
        <input
          type="checkbox"
          id="sortLikes"
          checked={state.category === "likes"}
          onChange={() => dispatch({ category: "likes" })}
        />
        <label htmlFor="sortLikes" className={likesIconClasses}>
          <AiOutlineArrowDown />
        </label>
        <label className="filter__text" htmlFor="sortLikes">
          LIKES
        </label>
      </div>
      <div
        className={`filter ${
          state.category === "name" ? "filter--active" : ""
        }`}
      >
        <input
          type="checkbox"
          id="sortName"
          checked={state.category === "name"}
          onChange={() => dispatch({ category: "name" })}
        />
        <label htmlFor="sortName" className={nameIconClasses}>
          <AiOutlineArrowDown />
        </label>
        <label className="filter__text" htmlFor="sortName">
          NAME
        </label>
      </div>
      <div
        className={`filter ${
          state.category === "places" ? "filter--active" : ""
        }`}
      >
        <input
          type="checkbox"
          id="sortPlaces"
          checked={state.category === "places"}
          onChange={() => dispatch({ category: "places" })}
        />
        <label htmlFor="sortPlaces" className={placesIconClasses}>
          <AiOutlineArrowDown />
        </label>
        <label className="filter__text" htmlFor="sortPlaces">
          PLACES
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

  margin-bottom: 3rem;

  font-size: 1.4rem;

  .title {
    color: var(--color-gray);
  }

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-lightgray);

    transition: 0.3s all;

    &__text {
      cursor: pointer;
      padding-left: 0.5rem;
    }

    &__icon {
      transition: 0.2s opacity;
      transform: scale(0);
      opacity: 0;
      font-size: 2.2rem;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: 0.3s all;

      &--active {
        transform: scale(1);
        opacity: 1;
        cursor: pointer;

        &--asc {
          transform: rotate(180deg);
        }
      }
    }

    input {
      display: none;
    }

    &--active {
      color: var(--color-primary);
    }
  }
`;
