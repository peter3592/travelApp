import React from "react";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export const UIContext = React.createContext();

export function UIProvider({ children }) {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [modal, setModal] = useState(null);
  const [minSearchBar, setMinSearchBar] = useState(true);

  const breakpoints = {};

  breakpoints.maxWidth300 = useMediaQuery({ query: "(max-width: 300px)" });
  breakpoints.maxWidth400 = useMediaQuery({ query: "(max-width: 400px)" });
  breakpoints.maxWidth450 = useMediaQuery({ query: "(max-width: 450px)" });
  breakpoints.maxWidth500 = useMediaQuery({ query: "(max-width: 500px)" });
  breakpoints.maxWidth550 = useMediaQuery({ query: "(max-width: 550px)" });
  breakpoints.maxWidth700 = useMediaQuery({ query: "(max-width: 700px)" });
  breakpoints.maxWidth800 = useMediaQuery({ query: "(max-width: 800px)" });
  breakpoints.maxWidth900 = useMediaQuery({ query: "(max-width: 900px)" });
  breakpoints.maxWidth1000 = useMediaQuery({ query: "(max-width: 1000px)" });

  const searchBarViewHandler = (e) => {
    if (e.target.dataset.element === "SearchBar")
      return setShowSearchResults(true);

    if (breakpoints.maxWidth550) setMinSearchBar(true);

    setShowSearchResults(false);
  };

  const value = {
    showSearchResults,
    searchBarViewHandler,
    modal,
    setModal,
    breakpoints,
    showSidebar,
    setShowSidebar,
    minSearchBar,
    setMinSearchBar,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
