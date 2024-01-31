import { useEffect, useReducer, useState } from "react";
import { AiOutlineFilter, AiFillFilter } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useUIContext } from "../../store/context";
import { Container } from "./WallFilter.styled";

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
  const [showFilterItems, setShowFilterItems] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    like: true,
    comment: true,
    newPlace: true,
  });

  const { breakpoints } = useUIContext();

  useEffect(() => {
    setFilteredItems(state);
  }, [state]);

  return (
    <Container breakpoints={breakpoints} showFilterItems={showFilterItems}>
      {!breakpoints.maxWidth550 && <p className="title">Filter</p>}
      {breakpoints.maxWidth550 && (
        <>
          {!showFilterItems && (
            <AiOutlineFilter
              className="filterActivationIcon"
              onClick={() => setShowFilterItems((prev) => !prev)}
            />
          )}
          {showFilterItems && (
            <AiFillFilter
              className="filterActivationIcon"
              onClick={() => setShowFilterItems((prev) => !prev)}
            />
          )}
        </>
      )}
      {(!breakpoints.maxWidth550 || showFilterItems) && (
        <div className="filter__items">
          <div
            className={`filter ${state.newPlace ? "filter--newPlaces" : ""}`}
          >
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
              className={`filter__icon ${
                state.like ? "filter__icon--active" : ""
              }`}
            >
              <BsFillCheckCircleFill />
            </label>
            <label className="filter__text" htmlFor="filterLikes">
              LIKES
            </label>
          </div>
        </div>
      )}
    </Container>
  );
}
