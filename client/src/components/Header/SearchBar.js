import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import { useUIContext } from "../../store/context";
import SearchBarResult from "./SearchBarResult";
import { Container } from "./SearchBar.styled";
import { useUsers } from "../../api/hooks/useUsers";
import { usePlaces } from "../../api/hooks/usePlaces";

export default function SearchBar({ minSearchBar, expandSidebar }) {
  const [searchString, setSearchString] = useState("");
  const { showSearchResults, breakpoints } = useUIContext();
  const { users } = useUsers();
  const { places } = usePlaces();

  useEffect(() => {
    if (!showSearchResults) setSearchString("");
  }, [showSearchResults]);

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchString.toLowerCase())
  );

  const filteredPlaces = places?.filter((place) =>
    place.name.toLowerCase().includes(searchString.toLowerCase())
  );

  const noResults =
    searchString && filteredUsers.length === 0 && filteredPlaces.length === 0;

  return (
    <Container
      minSearchBar={minSearchBar}
      onClick={expandSidebar}
      breakpoints={breakpoints}
    >
      <label htmlFor="searchBar">
        <HiOutlineSearch className="icon__glass" data-element="SearchBar" />
      </label>
      <input
        type="text"
        placeholder="Search user or place"
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
        data-element="SearchBar"
        id="searchBar"
      />
      {showSearchResults && (
        <>
          <div className="results__topPart" />
          <>
            <div className="results">
              {noResults && <SearchBarResult type="noResults" />}
              {!noResults &&
                filteredUsers.map((user) => (
                  <SearchBarResult
                    key={user._id}
                    type="user"
                    user={user}
                    searchString={searchString}
                  />
                ))}
              {!noResults &&
                filteredPlaces.map((place) => (
                  <SearchBarResult
                    key={place._id}
                    type="place"
                    place={place}
                    searchString={searchString}
                  />
                ))}
            </div>
          </>
        </>
      )}
    </Container>
  );
}
