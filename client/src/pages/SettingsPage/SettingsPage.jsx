import { useState } from "react";

import { useUIContext } from "../../store/context";
import SettingsMapLanguage from "./SettingsMapLanguage";
import SettingsMapType from "./SettingsMapType";
import SettingContainer from "./SettingContainer";
import SettingsPlaces from "./SettingsPlaces";
import { LoadingPageSpinner } from "../../components/UI";
import SettingsDelete from "./SettingsDelete";
import { Container } from "./SettingsPage.styled";
import { useUserPlaces } from "../../api/hooks/useUserPlaces";
import useShowErrorModal from "../../api/hooks/useShowErrorModal";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";

export function SettingsPage() {
  const [expandPlaces, setExpandPlaces] = useState(false);
  const { breakpoints } = useUIContext();
  const { currentUser } = useCurrentUser();

  const { isLoading, error, userPlaces } = useUserPlaces(currentUser.username);
  useShowErrorModal(error, isLoading, "Could not load your places");

  if (isLoading) return <LoadingPageSpinner />;

  return (
    <Container expandPlaces={expandPlaces} breakpoints={breakpoints}>
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
          <SettingsPlaces places={userPlaces} />
        </SettingContainer>
      </div>
      <SettingsDelete />
    </Container>
  );
}
