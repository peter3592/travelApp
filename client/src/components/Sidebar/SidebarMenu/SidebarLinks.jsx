import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

import SidebarLink from "./SidebarLink";
import { Container } from "./SidebarLinks.styled";

export default function SidebarLinks() {
  const endpoint = window.location.pathname;

  return (
    <Container>
      <SidebarLink
        icon={<FiHome />}
        text="Home Page"
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
    </Container>
  );
}
