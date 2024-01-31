import { useNavigate } from "react-router-dom";
import { AiFillLeftCircle } from "react-icons/ai";

import { useUIContext } from "../../../store/context";
import { Button } from "../../UI";
import TopPlaces from "../TopPlaces/TopPlaces";
import SidebarLinks from "./SidebarLinks";
import { Container } from "./SidebarMenu.styled";
import { useCurrentUser } from "../../../api/hooks/useCurrentUser";

export default function SidebarMenu() {
  const { currentUser } = useCurrentUser();
  const { breakpoints, setShowSidebar } = useUIContext();
  const navigate = useNavigate();

  return (
    <Container breakpoints={breakpoints}>
      {breakpoints.maxWidth1000 && (
        <div className="mobileBtnContainer">
          <AiFillLeftCircle
            onClick={() => setShowSidebar(false)}
            className="closeIcon"
          />
          {(window.location.pathname === "/" ||
            window.location.pathname === "/users" ||
            window.location.pathname === "/settings") && (
            <Button
              onClick={() => {
                setShowSidebar(false);
                navigate(`/${currentUser.username}`);
              }}
              type="secondary"
              small
            >
              GO TO MY MAP
            </Button>
          )}
        </div>
      )}
      {!breakpoints.maxWidth1000 && (
        <Button
          onClick={() => navigate(`/${currentUser.username}`)}
          type="secondary"
        >
          GO TO MY MAP
        </Button>
      )}
      <div className="menuContainer">
        <SidebarLinks />
        {!breakpoints.maxWidth1000 && <TopPlaces />}
      </div>
    </Container>
  );
}
