import { useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";
import fetchAPI from "../../../utils/fetchAPI";
import { useUIContext } from "../../../store/context";
import SearchBarResult from "./SearchBarResult";

export default function SearchBar() {
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [searchString, setSearchString] = useState("");

  const { showSearchResults } = useUIContext();

  const hideList = () => {
    setSearchedUsers([]);
    setSearchedPlaces([]);
    setSearchString("");
  };

  useEffect(() => {
    if (!showSearchResults) hideList();
  }, [showSearchResults]);

  useEffect(() => {
    (async () => {
      await searchHandler();
      if (!searchString) setFirstLoad(true);
      if (searchString.length === 1) setFirstLoad(false);
    })();
  }, [searchString]);

  const loadAllResults = async () => {
    if (searchString.length > 0) return;

    const { ok: usersOk, data: usersData } = await fetchAPI("api/v1/users");
    const { ok: placesOk, data: placesData } = await fetchAPI("api/v1/places");

    if (usersOk && placesOk) {
      setSearchedUsers(usersData.users);
      setSearchedPlaces(placesData.places);
    }
  };

  const searchHandler = async () => {
    const { ok: usersOk, data: usersData } = await fetchAPI(
      "api/v1/users/search-by-name",
      "POST",
      { searchString }
    );
    const { ok: placesOk, data: placesData } = await fetchAPI(
      "api/v1/places/search-by-name",
      "POST",
      { searchString }
    );

    if (usersOk && placesOk) {
      setSearchedUsers(usersData.users);
      setSearchedPlaces(placesData.places);
    }
  };

  const noResults =
    !firstLoad &&
    searchString &&
    searchedUsers.length === 0 &&
    searchedPlaces.length === 0;

  return (
    <Div>
      <HiOutlineSearch className="icon__glass" />
      <input
        type="text"
        placeholder="Search user or place"
        onChange={(e) => setSearchString(e.target.value.trim())}
        onFocus={loadAllResults}
        value={searchString}
        data-element="SearchBar"
      />
      {showSearchResults && (
        <>
          <div className="results__topPart" />
          <>
            <div className="results">
              {noResults && <SearchBarResult type="noResults" />}
              {!noResults &&
                searchedUsers.map((user) => (
                  <SearchBarResult
                    key={user._id}
                    type="user"
                    user={user}
                    searchString={searchString}
                  />
                ))}
              {!noResults &&
                searchedPlaces.map((place) => (
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
    </Div>
  );
}

const Div = styled.div`
  position: relative;
  width: 20rem;

  z-index: 1000;

  input {
    width: 100%;
    border-radius: 10rem;
    background-color: #ddd;
    border: 0;
    outline: none;
    padding: 1rem 0.7rem;
    padding-left: 3rem;
    color: var(--color-darkgray);
    color: var(--color-primary);

    ::placeholder {
      color: var(--color-gray);
      font-size: 1.2rem;
    }
  }

  .results {
    width: 100%;
    max-height: 25rem;
    position: absolute;
    top: 100%;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;

    &__topPart {
      width: 100%;
      height: 2rem;
      background-color: #ddd;
      position: absolute;
      top: 1.6rem;
      left: 0;

      z-index: -1;
    }
  }
`;
