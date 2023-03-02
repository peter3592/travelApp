import { useState } from "react";
// import { useEffect } from "react";
import styled from "styled-components";
import { useDataContext, useUIContext } from "../../../store/context";
import { BsTrash } from "react-icons/bs";
import fetchAPI from "../../../utils/fetchAPI";

export default function SettingsPlaces({ places, setPlaces }) {
  const { setPlace, reloadData } = useDataContext();
  const { setModal } = useUIContext();
  // const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     places.forEach((place) => {
  //       place.weather = "35 °C";
  //     });

  //     setLoading(false);
  //   })();
  // }, []);

  const trashClickHandler = async (id) => {
    if (deleting) return;

    setDeleting(true);

    const { ok } = await fetchAPI(`api/v1/places/${id}`, "DELETE");

    if (!ok) {
      setDeleting(false);
      return setModal({ type: "error", message: "Delete place error" });
    }

    setPlaces(places.filter((place) => place._id !== id));
    setModal({ type: "success", message: "Place deleted" });
    reloadData();
    setDeleting(false);
  };

  return (
    <>
      {places?.length === 0 && <Title>You have no places</Title>}
      {places?.length > 0 && (
        <Table>
          <p className="row row--first row--first--flag"></p>
          <p className="row row--first">Name</p>
          <p className="row row--first">Description</p>
          <p className="row row--first">Coordinates</p>
          <p className="row row--first row--first--trash"></p>
          {places.map((place) => (
            <>
              <div className="row row--flag">
                <div className="flagContainer">
                  <img src={place.country.flagUrl} crossorigin="anonymous" />
                </div>
              </div>
              <p className="row place__name" onClick={() => setPlace(place)}>
                <p>{place.name}</p>
              </p>
              <p className="row">{place.description}</p>
              <p className="row row--coords">
                <p className="coord">{place.location.coordinates[1]}</p>
                <p className="coord">{place.location.coordinates[0]}</p>
              </p>
              <p className="row row--trash">
                <div
                  className="trash__container"
                  data-id={place._id}
                  onClick={(e) => trashClickHandler(e.target.dataset.id)}
                ></div>
                <BsTrash className="trash__icon" />
              </p>
            </>
          ))}
        </Table>
      )}
    </>
  );
}

const Title = styled.p`
  font-size: 1.5rem;
  color: var(--color-gray);
`;

const Table = styled.div`
  display: grid;
  grid-template-columns:
    5rem minmax(10rem, max-content) 1fr minmax(10rem, max-content)
    max-content;
  /* grid-template-columns: 5rem 1fr 1fr 1fr 1fr max-content; */

  justify-items: center;
  align-items: center;

  /* flex-grow: 1; */

  padding: 0 2rem;

  /* max-width: 85%; */

  .row {
    width: 100%;
    height: 100%;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem;

    background-color: var(--color-grid-row);

    border-bottom: 1px solid var(--color-lightgray);

    .trash {
      &__container {
        background-color: transparent;
        width: 1.65rem;
        height: 2.1rem;

        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        cursor: pointer;
      }

      &__icon {
        color: var(--color-red);
        font-size: 1.7rem;
        cursor: pointer;
        z-index: 0;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }

    &--first {
      font-family: "Fredoka One";
      letter-spacing: 1px;
      font-size: 1.3rem;
      background-color: var(--color-lightgray);
      color: var(--color-darkgray);
      padding: 1rem 0.5rem;

      &--flag,
      &--trash {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &--trash {
      width: 5rem;
      height: 100%;
      padding: 0;
      position: relative;
    }

    &--coords {
      flex-direction: column;
      font-family: monospace;
      font-size: 1rem;
    }
  }

  .place {
    &__name {
      cursor: pointer;
      :hover {
        background-color: var(--color-grid-row-hover);
      }
    }
  }

  .flagContainer {
    width: 3rem;
    /* height: 1.775rem; */
    height: 2rem;

    text-align: center;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
