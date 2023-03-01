import { Link } from "react-router-dom";
import styled from "styled-components";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import SidebarUser from "./SidebarUser/SidebarUser";

export default function Sidebar({ type }) {
  return (
    <Div>
      <Link to="/" className="logo">
        travel<span>app</span>
      </Link>
      {type === "menu" && <SidebarMenu />}
      {type === "user" && <SidebarUser />}
    </Div>
  );
}

const Div = styled.div`
  width: var(--sidebar-width);
  height: 100%;

  background-color: var(--color-primary);

  display: flex;
  align-items: center;
  flex-direction: column;

  /* padding: 1.5rem 0; */

  /* padding: 0 2rem; */

  .logo {
    display: block;
    color: white;
    font-family: "Fredoka One", cursive;
    font-size: 3.5rem;
    text-align: center;
    margin-bottom: 3rem;
    text-decoration: none;

    span {
      color: var(--color-secondary);
    }
  }
`;
