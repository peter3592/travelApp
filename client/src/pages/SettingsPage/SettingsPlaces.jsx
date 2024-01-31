import { memo, useState } from "react";
import { BsTrash } from "react-icons/bs";

import { useDataContext, useUIContext } from "../../store/context";
import { Table, Title } from "./SettingsPlaces.styled";
import { useDeletePlace } from "../../api/hooks/useDeletePlace";
import useShowErrorModal from "../../api/hooks/useShowErrorModal";
import { shortenText } from "../../utils";

function SettingsPlaces({ places }) {
  const [deletingInProgress, setDeletingInProgress] = useState(false);
  const { setPlace } = useDataContext();
  const { breakpoints } = useUIContext();
  const { isDeleting, deletePlace, error } = useDeletePlace();
  useShowErrorModal(error, isDeleting, "Delete place error");

  const trashClickHandler = (id) => {
    if (deletingInProgress) return;

    setDeletingInProgress(true);
    deletePlace(id);
    setDeletingInProgress(false);
  };

  return (
    <>
      {places?.length === 0 && <Title>You have no places</Title>}
      {places?.length > 0 && (
        <Table breakpoints={breakpoints}>
          <p className="row row--first row--first--flag"></p>
          <p className="row row--first">Name</p>
          <p className="row row--first">Description</p>
          <p className="row row--first">
            {!breakpoints.maxWidth500 ? "Coordinates" : "Coords"}
          </p>
          <p className="row row--first row--first--trash"></p>
          {places.map((place) => (
            <>
              <div className="row row--flag">
                <div className="flagContainer">
                  <img
                    src={place.country.flagUrl}
                    crossorigin="anonymous"
                    alt={`Small flag of ${place.country.name}`}
                    title={place.country.name}
                  />
                </div>
              </div>
              <p className="row place__name" onClick={() => setPlace(place)}>
                <p>{place.name}</p>
              </p>
              <p className="row">
                {breakpoints.maxWidth500
                  ? shortenText(place.description)
                  : place.description}
              </p>
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

export default memo(SettingsPlaces);
