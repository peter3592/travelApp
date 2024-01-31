import { useEffect, useReducer } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

import { useUIContext } from "../../store/context";
import { Container } from "./UsersSort.styled";

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

  const { breakpoints } = useUIContext();

  useEffect(() => {
    onSortChange(state.category, state.descending);
  }, [state]);

  let likesIconClasses = "filter__icon";
  let nameIconClasses = "filter__icon";
  let placesIconClasses = "filter__icon";

  if (state.category === "likes") {
    likesIconClasses += state.descending
      ? " filter__icon--active"
      : " filter__icon--active filter__icon--active--asc";

    if (breakpoints.maxWidth400) {
      nameIconClasses += " sortHide";
      placesIconClasses += " sortHide";
    }
  }

  if (state.category === "name") {
    nameIconClasses += state.descending
      ? " filter__icon--active"
      : " filter__icon--active filter__icon--active--asc";

    if (breakpoints.maxWidth400) {
      likesIconClasses += " sortHide";
      placesIconClasses += " sortHide";
    }
  }

  if (state.category === "places") {
    placesIconClasses += state.descending
      ? " filter__icon--active"
      : " filter__icon--active filter__icon--active--asc";

    if (breakpoints.maxWidth400) {
      likesIconClasses += " sortHide";
      nameIconClasses += " sortHide";
    }
  }

  return (
    <Container breakpoints={breakpoints}>
      <p className="title">Sort</p>
      <div className="sort__items">
        <div
          className={`filter ${
            state.category === "likes" ? "filter--active" : ""
          }`}
        >
          <input
            type="checkbox"
            id="sortLikes"
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
            onChange={() => dispatch({ category: "places" })}
          />
          <label htmlFor="sortPlaces" className={placesIconClasses}>
            <AiOutlineArrowDown />
          </label>
          <label className="filter__text" htmlFor="sortPlaces">
            PLACES
          </label>
        </div>
      </div>
    </Container>
  );
}
