import React from "react";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import styled from "styled-components";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";

const FLY_DURATION = 2.5;
const DEFAULT_ZOOM_LEVEL = 8;
const MIN_ZOOM_LEVEL = 3;
const MAX_ZOOM_LEVEL = 18;

const generateFlags = (places) => {
  let countries = {};

  places.forEach((place) => {
    const countryName = place.country.name;

    if (!countries[countryName]) {
      countries[countryName] = {
        countryName,
        flagUrl: place.country.flagUrl,
        coordinates: [place.location.coordinates],
        zoomLevel: DEFAULT_ZOOM_LEVEL,
      };
      return;
    }

    countries[countryName].coordinates.push(place.location.coordinates);
  });

  countries = Object.values(countries);

  countries.forEach((country) => {
    if (country.coordinates.length === 1) {
      country.coordinates = country.coordinates[0];
      return;
    }

    const lats = [];
    const lngs = [];

    country.coordinates.forEach((coord) => {
      lats.push(coord[1]);
      lngs.push(coord[0]);
      // lats.push(coord[0]);
      // lngs.push(coord[1]);
    });

    // Calculate country coords (middle values between max and min)
    const latitude = (Math.max(...lats) + Math.min(...lats)) / 2;
    const longitude = (Math.max(...lngs) + Math.min(...lngs)) / 2;

    // Calculate Zoom level
    const latDiff = Math.abs(Math.max(...lats) - Math.min(...lats));
    const lonDiff = Math.abs(Math.max(...lngs) - Math.min(...lngs));
    const maxDiff = Math.max(latDiff, lonDiff);

    let zoomLevel = -1.273 * Math.log(maxDiff) + 7.8;

    if (zoomLevel > MAX_ZOOM_LEVEL) zoomLevel = MAX_ZOOM_LEVEL;
    if (zoomLevel < MIN_ZOOM_LEVEL) zoomLevel = MIN_ZOOM_LEVEL;

    country.coordinates = [longitude, latitude];
    country.zoomLevel = zoomLevel;
  });

  return countries;
};

const CountriesList = ({ map, places }) => {
  const [countries, setCountries] = useState([]);
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    setCountries(generateFlags(places));
    // setShowList(true);
  }, [places]);

  return (
    <Div showList={showList}>
      <div className="openList">
        <BsFillArrowLeftCircleFill
          className="openList__icon"
          onClick={() => setShowList((prev) => !prev)}
        />
      </div>
      <ul className="countriesList">
        {countries.map((country) => (
          <li className="countryFlag" key={country.countryName}>
            <img
              crossorigin="anonymous"
              key={nanoid()}
              src={country.flagUrl}
              srcSet={`${country.flagUrl} 2x`}
              alt={`Flag of ${country.countryName}`}
              draggable="false"
              width="80"
              height="53"
              onClick={() => {
                map.flyTo(
                  [...country.coordinates].reverse(),
                  country.zoomLevel,
                  {
                    animate: true,
                    duration: FLY_DURATION,
                  }
                );
              }}
            />
          </li>
        ))}
      </ul>
    </Div>
  );
};

export default CountriesList;

const Div = styled.div`
  height: 100%;
  width: 16rem;

  position: absolute;
  top: 0;
  right: 0;

  z-index: 500;

  background-color: rgba(0, 0, 0, 0.66);

  padding-right: 2rem;
  padding-left: 5rem;

  transform: ${({ showList }) =>
    showList ? "none;" : "translateX(calc(100% - 5.5rem));"};
  transition: 0.3s all;

  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  .countriesList {
    height: 100%;
    /* width: 100%; */
    padding: 2rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: auto;

    /* Hiding scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .countryFlag {
    cursor: pointer;
    transition: all 0.2s;

    :hover {
      transform: scale(1.1);
    }
    :not(:last-of-type) {
      margin-bottom: 2rem;
    }

    z-index: 501;

    img {
      border-radius: 6px;
    }
  }

  .openList {
    position: absolute;
    border-radius: 10rem;
    top: calc(50% - 1.5rem);
    left: 1.45rem;

    background-color: white;

    z-index: 499;
    width: 2.75rem;
    height: 2.75rem;

    transition: 0.3s all;

    transform: ${({ showList }) =>
      showList ? "rotateZ(180deg);" : "rotateZ(0);"};

    cursor: pointer;

    &__icon {
      width: 100%;
      height: 100%;
      color: var(--color-primary);
    }
  }
`;
