import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import Leaflet from "leaflet/dist/leaflet";
import "leaflet/dist/leaflet.css";
import { useDataContext, useUIContext } from "../../store/context";
import NewPlaceForm from "./NewPlaceForm";
import CountriesList from "./CountriesList";
import { Button } from "../../components/UI";
// import FindPlace from "./FindPlace";
import { Container } from "./MapPage.styled";
import { useUserPlaces } from "../../api/hooks/useUserPlaces";
import { useUser } from "../../api/hooks/useUser";
import { useGetCountry } from "../../api/hooks/useGetCountry";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";

const defaultCoords = [37, 35];
const defaultZoomLevel = 4;
const southWest = Leaflet.latLng(-89.9, -179.9);
const northEast = Leaflet.latLng(89.9, 179.9);
const bounds = Leaflet.latLngBounds(southWest, northEast);

export function MapPage() {
  const [newPlaceMod, setNewPlaceMod] = useState(false);
  const [showNewGameForm, setShowNewGameForm] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mapObject, setMapObject] = useState(null);
  const params = useParams();
  const { setPlace } = useDataContext();
  const { setModal, breakpoints } = useUIContext();
  const { currentUser } = useCurrentUser();
  const { userPlaces } = useUserPlaces(params.username);
  const { user: mapUser } = useUser(params.username);
  const { getCountry, data } = useGetCountry();

  const mapInit = () => {
    const leafletMap = Leaflet.map("map", {
      zoomControl: false,
      maxBounds: bounds,
      maxBoundsViscosity: 1,
    }).setView(defaultCoords, defaultZoomLevel);

    setMapObject(leafletMap);
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
        subdomains: ["mt1", "mt2", "mt3"],
        noWrap: true, // stop creating multiple maps
      }
    ).addTo(mapObject);
  };

  useEffect(() => {
    if (!currentUser) return;

    const mapLanguage = currentUser.settings.language;
    const mapType = currentUser.settings.mapType;

    if (!mapObject) mapInit(mapLanguage, mapType);
    if (mapObject) renderMap(mapLanguage, mapType);
  }, [mapObject]);

  useEffect(() => {
    if (mapObject) {
      mapObject.off("click");
      mapObject.on("click", (e) => mapClickHandler(e, newPlaceMod));
    }
  }, [newPlaceMod]);

  useEffect(() => {
    if (mapObject) fillMap(mapObject);
  }, [userPlaces, mapObject]);

  const mapClickHandler = (e, newPlaceMod) => {
    if (!newPlaceMod) return;

    setLatitude(+e.latlng.lat);
    setLongitude(+e.latlng.lng);

    getCountry([+e.latlng.lat, +e.latlng.lng]);

    setModal(null);
    setShowNewGameForm(true);
  };

  const photoIconClickHandler = async (e) => {
    setPlace(null);
    setNewPlaceMod(false);

    if (!mapUser) return;

    const lat = e.target._latlng.lat;
    const lng = e.target._latlng.lng;

    const place = userPlaces.find(
      (place) =>
        place.location.coordinates[0] === lng &&
        place.location.coordinates[1] === lat
    );

    if (!place)
      return setModal({
        type: "error",
        message: "Place does not exists anymore",
      });

    setPlace(place);
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

  const hideForm = () => {
    setNewPlaceMod(false);
    setShowNewGameForm(false);
  };

  const fillMap = (map) => {
    map.eachLayer((layer) => {
      if (layer._icon) map.removeLayer(layer);
    });

    if (!userPlaces || userPlaces.length === 0) return;

    userPlaces.forEach((place) => {
      const coordinates = [...place.location.coordinates];

      const marker = new Leaflet.marker(coordinates.reverse(), {
        icon: Leaflet.icon({
          iconUrl:
            currentUser.settings.mapType === "light"
              ? "cameraIconDark.png"
              : "cameraIconLight.png",
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

  return (
    <Container newPlaceMod={newPlaceMod} breakpoints={breakpoints}>
      {data && showNewGameForm && newPlaceMod && (
        <NewPlaceForm
          latitude={latitude}
          longitude={longitude}
          countryName={data.countryName}
          flagUrl={data.flagUrl}
          hideForm={hideForm}
          userPlaces={userPlaces}
        />
      )}
      <div className="actionsContainer">
        {mapUser &&
          mapUser._id === currentUser._id &&
          !breakpoints.maxWidth550 && (
            <Button
              onClick={addPlaceButtonClickHandler}
              className={`button ${
                userPlaces && userPlaces.length === 0 && !newPlaceMod
                  ? "button--highlighted"
                  : ""
              } `}
              type="primary"
            >
              ADD NEW PLACE
            </Button>
          )}
        {mapUser &&
          mapUser._id === currentUser._id &&
          breakpoints.maxWidth550 && (
            <div className="addPlaceIconContainer">
              <AiFillPlusCircle
                className="addPlaceIcon"
                onClick={addPlaceButtonClickHandler}
              />
            </div>
          )}

        {/* {!breakpoints.maxWidth550 && <FindPlace map={map} />} */}
      </div>
      <div className="mapContainer">
        {userPlaces &&
          mapObject &&
          ((!breakpoints.maxWidth1000 && userPlaces.length > 0) ||
            (breakpoints.maxWidth1000 && mapUser)) && (
            <CountriesList map={mapObject} places={userPlaces} />
          )}
        <div id="map" />
      </div>
    </Container>
  );
}
