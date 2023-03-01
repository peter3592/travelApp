import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthContext } from "../../../store/context";
import Button from "../../UI/Button";
import TopPlaces from "../TopPlaces/TopPlaces";
import SidebarLinks from "./SidebarLinks";

export default function SidebarMenu() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  return (
    <Div>
      <Button
        onClick={() => navigate(`/${currentUser.username}`)}
        type="secondary"
      >
        GO TO MY MAP
      </Button>
      <div className="menuContainer">
        <SidebarLinks />
        <TopPlaces />
      </div>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  flex-grow: 1;

  width: 100%;

  padding: 0 3rem;

  /* width: 100%;
  height: 100%; */

  .menuContainer {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* justify-content: center; */

    width: 100%;

    /* background-color: pink; */
    /* height: 100%; */
    /* height: 50rem; */
    /* height: 5rem; */
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    /* justify-content: space-between;
    align-items: space-between; */
  }
`;
