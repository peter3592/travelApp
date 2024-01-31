import React from "react";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { useUIContext } from "../../store/context";
import { Container } from "./CountriesList.styled";
import { useUser } from "../../api/hooks/useUser";
import { useParams } from "react-router-dom";
import {
  FLY_DURATION,
  DEFAULT_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
  MAX_ZOOM_LEVEL,
} from "../../utils/constants";

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

const calcCountries = (places) => {
  const countries = new Set();

  places.forEach((place) => countries.add(place.country.name));

  return countries.size;
};

export default function CountriesList({ map, places }) {
  const [showList, setShowList] = useState(true);
  const { breakpoints } = useUIContext();
  const params = useParams();
  const { user: mapUser } = useUser(params.username);

  return (
    <Container showList={showList} breakpoints={breakpoints}>
      <div className="openList">
        <BsFillArrowLeftCircleFill
          className="openList__icon"
          onClick={() => setShowList((prev) => !prev)}
        />
      </div>
      <div className="container">
        <ul className="countriesList">
          {breakpoints.maxWidth1000 && (
            <div className="mapUser">
              <div className="mapUser__photo">
                <img
                  src={mapUser?.photo}
                  alt={`Photo of ${mapUser.username}`}
                  crossorigin="anonymous"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "img/anonymousPhoto.jpg";
                  }}
                />
                <p className="mapUser__name">{mapUser?.username}</p>
              </div>
              <div className="stats">
                <div className="stats__countries">
                  <div className="stats__icon">
                    <FaGlobeAmericas />
                  </div>
                  <div className="stats__details">
                    <div className="stats__title">COUNTRIES</div>
                    <div className="stats__number">{calcCountries(places)}</div>
                  </div>
                </div>
                <div className="stats__places">
                  <div className="stats__icon">
                    <IoMdPin />
                  </div>
                  <div className="stats__details">
                    <div className="stats__title">PLACES</div>
                    <div className="stats__number">{places.length}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* <ul className="countriesList"> */}
          {/* {countries.map((country) => ( */}
          {generateFlags(places).map((country) => (
            <li className="countryFlag" key={country.countryName}>
              <img
                crossorigin="anonymous"
                key={nanoid()}
                src={country.flagUrl}
                srcSet={`${country.flagUrl} 2x`}
                alt={`Flag of ${country.countryName}`}
                draggable="false"
                width={breakpoints.maxWidth500 ? "64" : "70"}
                height={breakpoints.maxWidth500 ? "42.5" : "46"}
                onClick={() =>
                  map.flyTo(
                    [...country.coordinates].reverse(),
                    country.zoomLevel,
                    {
                      animate: true,
                      duration: FLY_DURATION,
                    }
                  )
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
