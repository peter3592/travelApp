import Leaflet from "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";

import { useEffect, useState } from "react";
import {
  useAuthContext,
  useDataContext,
  useUIContext,
} from "../../../../store/context";

import styled from "styled-components";
import NewPlaceForm from "./NewPlaceForm";
import CountriesList from "./CountriesList";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../UI/Button";
import fetchAPI from "../../../../utils/fetchAPI";
import FindPlace from "./FindPlace";

const defaultCoords = [37, 35];
const defaultZoomLevel = 4;
const southWest = Leaflet.latLng(-89.9, -179.9);
const northEast = Leaflet.latLng(89.9, 179.9);
const bounds = Leaflet.latLngBounds(southWest, northEast);

let map;

const mapInit = () => {
  map = Leaflet.map("map", {
    zoomControl: false,
    maxBounds: bounds,
    maxBoundsViscosity: 1,
  }).setView(defaultCoords, defaultZoomLevel);
};

export default function Map() {
  const { currentUser } = useAuthContext();

  const { setPlace, reloadData } = useDataContext();

  const { setModal } = useUIContext();

  const [newPlaceMod, setNewPlaceMod] = useState(false);
  const [showNewGameForm, setShowNewGameForm] = useState(false);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [flagUrl, setFlagUrl] = useState(null);

  const [places, setPlaces] = useState(null);
  const [user, setUser] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const mapLanguage = currentUser.settings.language;
    const mapType = currentUser.settings.mapType;

    mapInit(mapLanguage, mapType);
    renderMap(mapLanguage, mapType);

    map.on("click", (e) => mapClickHandler(e));
  }, []);

  useEffect(() => {
    (async () => {
      const username = params.username;

      if (!username) return;

      // Getting user
      const { ok: userOk, data: dataUser } = await fetchAPI(
        `api/v1/users/${username}`
      );

      if (!userOk) navigate("/");

      setUser(dataUser.user);

      // Getting places
      const { ok: placesOk, data: dataPlaces } = await fetchAPI(
        `api/v1/users/${username}/places`
      );

      if (placesOk) setPlaces(dataPlaces.places);
    })();

    fillMap(map);
  }, [params]);

  useEffect(() => {
    fillMap(map);
  }, [places]);

  const mapClickHandler = async (e) => {
    //

    console.log(+e.latlng.lat, +e.latlng.lng);

    setLatitude(+e.latlng.lat);
    setLongitude(+e.latlng.lng);

    const { ok, data } = await fetchAPI("api/v1/places/get-country", "POST", {
      latitude: +e.latlng.lat,
      longitude: +e.latlng.lng,
    });

    if (!ok)
      return setModal({
        type: "info",
        message: "Could not recognize country",
      });

    setModal(null);

    setCountryName(data.countryName);
    setFlagUrl(data.flagUrl);
    setShowNewGameForm(true);
    // }
  };

  const photoIconClickHandler = async (e) => {
    setPlace(null);

    const lat = e.target._latlng.lat;
    const lng = e.target._latlng.lng;

    const { ok, data } = await fetchAPI(
      `api/v1/users/${user.username}/places?lat=${lat}&lng=${lng}`
    );

    if (!ok || (ok && data.places.length === 0)) {
      reloadData();
      setNewPlaceMod(false);
      return setModal({
        type: "error",
        message: "Place does not exists anymore",
      });
    }

    setPlace(data.places[0]);
  };

  const addPlaceButtonClickHandler = () => {
    if (!newPlaceMod)
      setModal({
        type: "info",
        message: "Choose location by clicking on map",
      });

    setShowNewGameForm(false);
    setNewPlaceMod((prev) => !prev);
  };

  const fillMap = async (map) => {
    map.eachLayer((layer) => {
      if (layer._icon) map.removeLayer(layer);
    });

    if (!places || places.length === 0) return;

    places.forEach((place) => {
      const coordinates = [...place.location.coordinates];

      const marker = new Leaflet.marker(coordinates.reverse(), {
        icon: Leaflet.icon({
          iconUrl:
            currentUser.settings.mapType === "light"
              ? "camera-icon--dark.png"
              : "camera-icon--light.png",
          iconSize: [22, 22],
          iconAnchor: [10, 10],
          popupAnchor: [-3, -30],
        }),
        alt: place.name,
        riseOnHover: true,
      });

      marker
        .addTo(map)
        .bindPopup(place.name, {
          className: "popup",
          closeButton: false,
        })
        .on("click", photoIconClickHandler)
        .on("mouseover", function () {
          this.openPopup();
        })
        .on("mouseout", function () {
          this.closePopup();
        });
    });
  };

  const hideForm = () => {
    setNewPlaceMod(false);
    setShowNewGameForm(false);
  };

  const renderMap = (mapLanguage, mapType) => {
    let mapTypeLeaflet;

    if (mapType === "light") mapTypeLeaflet = "m";
    if (mapType === "dark") mapTypeLeaflet = "y";

    Leaflet.tileLayer(
      `https://{s}.google.com/vt/lyrs=${mapTypeLeaflet}&x={x}&y={y}&z={z}&hl=${mapLanguage}`,
      {
        maxZoom: 18,
        minZoom: 2.5,
        // subdomains: ["mts0", "mts1", "mts2", "mts3"],
        // subdomains: ["mts0", "mts2"],
        subdomains: ["mt1", "mt2", "mt3"],
        noWrap: true, // stop creating multiple maps
      }
    ).addTo(map);
  };

  return (
    <>
      <Div newPlaceMod={newPlaceMod}>
        {showNewGameForm && newPlaceMod && (
          <NewPlaceForm
            latitude={latitude}
            longitude={longitude}
            countryName={countryName}
            flagUrl={flagUrl}
            hideForm={hideForm}
            places={places}
            setPlaces={setPlaces}
          />
        )}
        <div className="actionsContainer">
          {user && user._id === currentUser._id && (
            <Button
              onClick={addPlaceButtonClickHandler}
              className={`button ${
                places && places.length === 0 && !newPlaceMod
                  ? "button--highlighted"
                  : ""
              } `}
              type="primary"
            >
              ADD NEW PLACE
            </Button>
          )}
          <FindPlace map={map} />
        </div>
        <div className="mapContainer">
          {places && places.length > 0 && (
            <CountriesList map={map} places={places} />
          )}
          <div id="map" />
        </div>
      </Div>
    </>
  );
}

const Div = styled.div`
  width: 100%;
  height: calc(100% - var(--header-height));

  /* overflow: hidden; */

  padding: 1rem 4rem 4rem;

  position: relative;

  .actionsContainer {
    position: absolute;
    top: 3rem;
    left: 6rem;

    /* background-color: red; */
    z-index: 500;
  }

  .mapContainer {
    width: 100%;
    height: 100%;
    position: relative;

    border-radius: var(--border-radius);

    overflow: hidden;
  }

  .button {
    /* position: absolute;
    top: 3rem;
    left: 6rem; */

    margin-bottom: 1em;

    &--highlighted {
      animation: animationBtn 1s infinite;
    }

    @keyframes animationBtn {
      from,
      to {
        transform: scale(1);
      }

      50% {
        transform: scale(1.1);
      }
    }
  }

  /* .findPlace {

  } */

  #map {
    width: 100%;
    height: 100%;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    transform: scale(1.05);

    overflow: hidden;

    cursor: ${({ newPlaceMod }) => (newPlaceMod ? "crosshair" : "hand")};
  }
`;
