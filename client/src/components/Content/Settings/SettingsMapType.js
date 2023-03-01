import { useState } from "react";
import styled from "styled-components";
import { useAuthContext, useUIContext } from "../../../store/context";
import fetchAPI from "../../../utils/fetchAPI";

export default function SettingContainerType() {
  const { currentUser } = useAuthContext();
  const { setModal } = useUIContext();

  const [mapType, setMapType] = useState(currentUser.settings.mapType);

  const mapTypeClickHandler = async (type) => {
    if ((type !== "light" && type !== "dark") || mapType === type) return;

    const newMapType = mapType === "light" ? "dark" : "light";

    const { ok, message } = await fetchAPI(
      `api/v1/users/${currentUser.username}`,
      "PATCH",
      { mapType: newMapType }
    );

    if (!ok)
      return setModal({
        type: "error",
        message: "Changing map type error",
      });

    setMapType(newMapType);
    currentUser.settings.mapType = newMapType;
  };

  return (
    <Div>
      <div className="images">
        <div
          className={mapType === "light" ? "image image--chosen" : "image"}
          onClick={() => mapTypeClickHandler("light")}
        >
          <img src="/img/map--light.jpg" />
        </div>
        <div
          className={mapType === "dark" ? "image image--chosen" : "image"}
          onClick={() => mapTypeClickHandler("dark")}
        >
          <img src="/img/map--dark.jpg" alt="Dark map image" />
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  .images {
    display: flex;
    gap: 2rem;
    /* overflow: hidden; */
  }

  .image {
    width: 9rem;
    height: 6.5rem;
    border: 6px solid transparent;
    cursor: pointer;
    transition: all 0.2s;

    :hover:not(.image--chosen) {
      border: 6px solid var(--color-secondary-light);
    }

    &--chosen {
      border: 6px solid var(--color-secondary);
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
