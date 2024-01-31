import { useParams } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { Container } from "./SidebarUser.styled";
import { useUser } from "../../../api/hooks/useUser";
import { useUserPlaces } from "../../../api/hooks/useUserPlaces";

export default function SidebarUser() {
  const params = useParams();

  const { user } = useUser(params.username);
  const { userPlaces } = useUserPlaces(params.username);

  const calcCountries = (userPlaces) => {
    const countries = new Set();

    userPlaces.forEach((place) => countries.add(place.country.name));

    return countries.size;
  };

  return (
    <Container>
      {user && userPlaces && (
        <>
          <div className="user">
            <div className="photo">
              <img
                src={user.photo}
                crossorigin="anonymous"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "img/anonymousPhoto.jpg";
                }}
                alt="User photo"
              />
            </div>
            <div className="username">{user.username}</div>
          </div>
          <div className="stats">
            <div className="stats__countries">
              <div className="stats__icon">
                <FaGlobeAmericas />
              </div>
              <div className="stats__details">
                <div className="stats__title">COUNTRIES</div>
                <div className="stats__number">{calcCountries(userPlaces)}</div>
              </div>
            </div>
            <div className="stats__places">
              <div className="stats__icon">
                <IoMdPin />
              </div>
              <div className="stats__details">
                <div className="stats__title">PLACES</div>
                <div className="stats__number">{userPlaces.length}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
