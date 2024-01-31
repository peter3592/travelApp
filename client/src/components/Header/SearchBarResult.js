import { FiUser } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useDataContext, useUIContext } from "../../store/context";
import { spanAllSubstrings } from "../../utils";
import { Container } from "./SearchBarResult.styled";

export default function SearchBarResult({ type, searchString, place, user }) {
  const { setPlace } = useDataContext();
  const { breakpoints } = useUIContext();

  const navigate = useNavigate();

  let icon;
  let photo;
  let name;
  let clickHandler;

  if (type === "user") {
    icon = <FiUser className="icon" />;
    photo = user.photo;
    name =
      searchString.length > 0
        ? spanAllSubstrings(user.username, searchString)
        : user.username;

    clickHandler = () => navigate("/" + user.username);
  }

  if (type === "place") {
    icon = <MdOutlinePlace className="icon" />;
    photo = place.smallPhotoUrl;
    name =
      searchString.length > 0
        ? spanAllSubstrings(place.name, searchString)
        : place.name;
    clickHandler = () => setPlace(place);
  }

  if (type === "noResults")
    return (
      <Container breakpoints={breakpoints}>
        <p className="name">No results</p>
      </Container>
    );

  return (
    <Container onClick={clickHandler} breakpoints={breakpoints}>
      {icon}
      <div className="photo">
        <img src={photo} crossorigin="anonymous" alt="Search result image" />
      </div>
      <p className="name">{name}</p>
    </Container>
  );
}
