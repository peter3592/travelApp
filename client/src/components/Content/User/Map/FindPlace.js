import { useState } from "react";
import styled from "styled-components";
import { useUIContext } from "../../../../store/context";
import fetchAPI from "../../../../utils/fetchAPI";
import { HiOutlineSearch } from "react-icons/hi";
import LoadingSpinner2 from "../../../UI/LoadingSpinner2";

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
    <Div>
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
        {findPlace.length > 0 && finding && <LoadingSpinner2 type="small" />}
        {/* <HiOutlineSearch className="icon" onClick={findPlaceHandler} /> */}
        {/* <LoadingSpinner2 type="small" /> */}
      </div>
    </Div>
  );
}

const Div = styled.div`
  /* position: absolute;
  top: 3rem;
  left: 50%;
  transform: translateX(-50%); */

  position: relative;

  input {
    width: 17.75rem;
    padding: 1.25rem 3.5rem 1.25rem 2rem;
    border-radius: 10rem;
    border: 3px solid var(--color-gray);
    outline: none;
    font-size: 1.3rem;
    color: var(--color-primary);
    background-color: var(--color-findPlace);

    :not(:last-of-type) {
      margin-bottom: 1.2rem;
    }

    ::placeholder {
      font-size: 1.2rem;
      color: var(--color-gray);
    }
  }

  .iconContainer {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.8rem;
    /* background-color: red; */

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .iconGlass {
    /* position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.8rem; */
    color: var(--color-gray);
    color: var(--color-primary);
    cursor: pointer;
    transition: 0.2s all;

    :hover {
      transform: scale(1.15);
    }
  }
`;
