import styled from "styled-components";
import { useDataContext } from "../../../store/context";
// import { BsFillPinMapFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";

import spanAllSubstrings from "../../../utils/spanAllSubstrings";
import { useNavigate } from "react-router-dom";

export default function SearchBarResult({ type, searchString, place, user }) {
  const { setPlace } = useDataContext();

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
    photo = place.photoUrl;
    name =
      searchString.length > 0
        ? spanAllSubstrings(place.name, searchString)
        : place.name;
    clickHandler = () => setPlace(place);
  }

  if (type === "noResults")
    return (
      <Div>
        <p className="name">No results</p>
      </Div>
    );

  return (
    <Div onClick={clickHandler}>
      {icon}
      <div className="photo">
        <img src={photo} crossorigin="anonymous" />
      </div>
      <p className="name">{name}</p>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  background-color: #ddd;
  padding: 1rem 1rem;
  color: var(--color-darkgray);
  /* width: 102%; */

  border-top: 2px solid white;
  /* border-top: 2px solid var(--color-lightgray); */

  transition: 0.2s all;

  :hover {
    background-color: #eee;
  }
  /* :not(:last-of-type) {
  } */

  .icon {
    /* width: 2rem; */
    height: 2rem;
    color: var(--color-primary);

    flex-basis: 2rem;
    flex-shrink: 0;
  }

  .photo {
    /* width: 3rem; */
    height: 3rem;
    margin: 0 1rem;

    flex-basis: 3rem;
    flex-shrink: 0;

    /* background: yellow; */

    img {
      width: 100%;
      height: 100%;
    }
  }

  .name {
    font-size: 1.4rem;
  }

  span {
    font-weight: bold;
    font-size: 1.6rem;
    color: var(--color-primary);
  }
`;
