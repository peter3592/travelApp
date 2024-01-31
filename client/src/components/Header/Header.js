import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";

import { useUIContext } from "../../store/context";
import SearchBar from "./SearchBar";
import { Hamburger } from "../UI";
import { Container } from "./Header.styled";
import { useLogout } from "../../api/hooks/useLogout";
import { useCurrentUser } from "../../api/hooks/useCurrentUser";

export default function Header() {
  const { currentUser } = useCurrentUser();

  const { showSearchResults, breakpoints, minSearchBar, setMinSearchBar } =
    useUIContext();
  const { logout } = useLogout();

  useEffect(() => {
    setMinSearchBar(breakpoints.maxWidth550);
  }, [breakpoints.maxWidth550]);

  const expandSidebarHandler = () => {
    if (minSearchBar) setMinSearchBar(false);
  };

  return (
    <Container breakpoints={breakpoints} minSearchBar={minSearchBar}>
      {currentUser && (
        <>
          <div className="hamburger">
            {breakpoints.maxWidth1000 && <Hamburger />}
          </div>

          <SearchBar
            minSearchBar={minSearchBar}
            expandSidebar={expandSidebarHandler}
          />
          {(!breakpoints.maxWidth550 ||
            (breakpoints.maxWidth550 && !showSearchResults)) && (
            <div className="user">
              <div className="user__name">
                <Link
                  to={`/${currentUser.username}`}
                  className="user__name__link"
                >
                  {currentUser.username}
                </Link>
              </div>
              <div className="user__photo">
                <Link to={`/${currentUser.username}`}>
                  <img
                    src={currentUser.photo}
                    alt={`${currentUser.photo}'s photo`}
                    crossorigin="anonymous"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "img/anonymousPhoto.jpg";
                    }}
                  />
                </Link>
              </div>
              <div className="logout">
                <AiOutlinePoweroff className="icon__logout" onClick={logout} />
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
