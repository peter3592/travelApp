import React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export const UIContext = React.createContext();

export function UIProvider(props) {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [modal, setModal] = useState(null);

  const breakpoints = {};

  breakpoints.maxWidth300 = useMediaQuery({ query: "(max-width: 300px)" });
  breakpoints.maxWidth500 = useMediaQuery({ query: "(max-width: 500px)" });
  breakpoints.maxWidth700 = useMediaQuery({ query: "(max-width: 700px)" });
  breakpoints.maxWidth800 = useMediaQuery({ query: "(max-width: 800px)" });
  breakpoints.maxWidth900 = useMediaQuery({ query: "(max-width: 900px)" });
  breakpoints.maxWidth1000 = useMediaQuery({ query: "(max-width: 1000px)" });

  const searchBarViewHandler = (e) => {
    if (e.target.dataset.element === "SearchBar")
      return setShowSearchResults(true);

    setShowSearchResults(false);
  };

  const value = {
    showSearchResults,
    searchBarViewHandler,
    modal,
    setModal,
    breakpoints,
  };

  return (
    <UIContext.Provider value={value}>{props.children}</UIContext.Provider>
  );
}
