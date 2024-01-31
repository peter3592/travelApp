import { Link } from "react-router-dom";

import { useUIContext } from "../../store/context";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import SidebarUser from "./SidebarUser/SidebarUser";
import { Container } from "./Sidebar.styled";

export default function Sidebar({ type }) {
  const { showSidebar, breakpoints } = useUIContext();

  return (
    <Container breakpoints={breakpoints} showSidebar={showSidebar}>
      {!breakpoints.maxWidth1000 && (
        <Link to="/" className="logo">
          travel<span>app</span>
        </Link>
      )}
      {(type === "menu" || breakpoints.maxWidth1000) && <SidebarMenu />}
      {type === "user" && !breakpoints.maxWidth1000 && <SidebarUser />}
    </Container>
  );
}
