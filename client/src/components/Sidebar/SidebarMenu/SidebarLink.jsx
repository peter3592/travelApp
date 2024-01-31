import { useUIContext } from "../../../store/context";
import { MyLink } from "./SidebarLink.styled";

export default function SidebarLink({ icon, text, endpoint, active }) {
  const { breakpoints, setShowSidebar } = useUIContext();

  return (
    <MyLink
      to={endpoint}
      style={{ textDecoration: "none" }}
      active={active ? 1 : 0}
      breakpoints={breakpoints}
      onClick={() => {
        if (breakpoints.maxWidth1000) setShowSidebar(false);
      }}
    >
      {active && !breakpoints.maxWidth1000 && (
        <div className="active">
          <div className="active__rightRadius active__rightRadius--top">
            <div className="active__rightRadius__circle active__rightRadius__circle--top" />
          </div>
          <div className="active__rightRadius active__rightRadius--bottom">
            <div className="active__rightRadius__circle active__rightRadius__circle--bottom" />
          </div>
        </div>
      )}
      <div className="linkContainer">
        <div className="icon">{icon}</div>
        <div className="text">{text.toUpperCase()}</div>
      </div>
    </MyLink>
  );
}
