import SidebarLink from "./SidebarLink";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import styled from "styled-components";

export default function SidebarLinks() {
  const endpoint = window.location.pathname;

  return (
    <Div>
      <SidebarLink
        icon={<FiHome />}
        text="Dashboard"
        endpoint={"/"}
        active={endpoint === "/"}
      />
      <SidebarLink
        icon={<FiUsers />}
        text="Users"
        endpoint={"/users"}
        active={endpoint === "/users"}
      />
      <SidebarLink
        icon={<FiSettings />}
        text="Settings"
        endpoint={"/settings"}
        active={endpoint === "/settings"}
      />
    </Div>
  );
}

const Div = styled.div`
  /* margin-top: 4rem; */
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  /* width: 40%; */

  color: white;
`;
