import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import { useUIContext } from "../../store/context";
import { LoadingDataSpinner } from "../../components/UI";
import { Container } from "./FindPlace.styled";
import { fetchAPI } from "../../utils/fetchAPI";

export default function FindPlace({ map }) {
  const [findPlace, setFindPlace] = useState("");
  const [finding, setFinding] = useState(false);
  const { setModal } = useUIContext();

  const findPlaceHandler = async (e) => {
    e.preventDefault();
    setFinding(true);

    const { ok, data, message } = await fetchAPI(
      "api/v1/places/get-coordinates",
      "POST",
      {
        place: findPlace,
      }
    );

    setFinding(false);

    if (!ok) return setModal({ type: "error", message });

    map.flyTo(data.coordinates, 7, {
      animate: true,
      duration: 2.5,
    });

    setFindPlace("");
  };

  return (
    <Container>
      <form action="" onSubmit={findPlaceHandler}>
        <input
          type="text"
          value={findPlace}
          onChange={(e) => setFindPlace(e.target.value)}
          placeholder="Find city on map"
        />
      </form>
      <div className="iconContainer">
        {findPlace.length > 0 && !finding && (
          <HiOutlineSearch className="iconGlass" onClick={findPlaceHandler} />
        )}
        {findPlace.length > 0 && finding && <LoadingDataSpinner type="small" />}
      </div>
    </Container>
  );
}
