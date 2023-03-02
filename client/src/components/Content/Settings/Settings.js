import styled from "styled-components";
import SettingsMapLanguage from "./SettingsMapLanguage";
import SettingsMapType from "./SettingsMapType";
import SettingContainer from "./SettingContainer";
import SettingsPlaces from "./SettingsPlaces";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../../store/context";
import fetchAPI from "../../../utils/fetchAPI";
import LoadingSpinner from "../../UI/LoadingSpinner";
import SettingsDelete from "./SettingsDelete";

export default function Settings() {
  const [expandPlaces, setExpandPlaces] = useState(false);
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    (async () => {
      const { ok, data } = await fetchAPI(
        `api/v1/users/${currentUser.username}/places`
      );

      if (ok) setPlaces(data.places);

      setLoading(false);
    })();
  }, []);

  return (
    <Div expandPlaces={expandPlaces}>
      {loading || !places ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="settings__map">
            <SettingContainer title="MAP LANGUAGE" type="language">
              <SettingsMapLanguage />
            </SettingContainer>
            <SettingContainer title="MAP TYPE" type="mapType">
              <SettingsMapType />
            </SettingContainer>
          </div>
          <div className="settings__places">
            <SettingContainer
              title="MANAGE PLACES"
              type="places"
              expandPlaces={expandPlaces}
              setExpandPlaces={setExpandPlaces}
            >
              <SettingsPlaces places={places} setPlaces={setPlaces} />
            </SettingContainer>
          </div>
          <SettingsDelete />
          {/* <div className="settings__delete">
            <Button type="delete">Delete Account</Button>
          </div> */}
        </>
      )}
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: calc(100% - var(--header-height));
  background-color: white;
  padding: 2rem;

  color: black;

  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  display: flex;
  flex-direction: column;

  position: relative;

  .settings__map {
    display: flex;
    user-select: none;
    width: 100%;
    overflow: hidden;

    transition: 0.5s all;

    max-height: ${({ expandPlaces }) => (expandPlaces ? "0;" : "10.5rem;")};
    opacity: ${({ expandPlaces }) => (expandPlaces ? "0;" : "1;")};
  }

  .settings__places {
    flex-grow: 1;
    height: 10rem;
    width: 100%;
    padding: 3rem 0;

    padding-top: ${({ expandPlaces }) => (expandPlaces ? "0;" : "3.5rem;")};
  }

  /* .settings__delete {
    border-top: 3px solid var(--color-red);
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
    max-width: 50rem;
    margin: 0 auto;
  } */
`;
