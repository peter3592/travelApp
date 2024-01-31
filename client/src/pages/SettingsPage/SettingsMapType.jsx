import { useUIContext } from "../../store/context";
import { Container } from "./SettingsMapType.styled";
import { useChangeMapType } from "../../api/hooks/useChangeMapType";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";

export default function SettingContainerType() {
  const { currentUser } = useCurrentUser();

  const { breakpoints } = useUIContext();
  const { changeMapType } = useChangeMapType();

  const mapTypeClickHandler = async (type) => {
    const currentMapType = currentUser.settings.mapType;

    if ((type !== "light" && type !== "dark") || currentMapType === type)
      return;

    const newMapType = currentMapType === "light" ? "dark" : "light";

    changeMapType(newMapType);
  };

  return (
    <Container breakpoints={breakpoints}>
      <div className="images">
        <div
          className={
            currentUser.settings.mapType === "light"
              ? "image image--chosen"
              : "image"
          }
          onClick={() => mapTypeClickHandler("light")}
        >
          <img src="/img/map--light.jpg" />
        </div>
        <div
          className={
            currentUser.settings.mapType === "dark"
              ? "image image--chosen"
              : "image"
          }
          onClick={() => mapTypeClickHandler("dark")}
        >
          <img src="/img/map--dark.jpg" alt="Dark map image" />
        </div>
      </div>
    </Container>
  );
}
