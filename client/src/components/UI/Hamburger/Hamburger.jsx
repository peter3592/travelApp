import { useUIContext } from "../../../store/context";
import { Container } from "./Hamburger.styled";

export function Hamburger() {
  const { setShowSidebar, breakpoints } = useUIContext();

  return (
    <Container onClick={() => setShowSidebar(true)} breakpoints={breakpoints}>
      <div className="line line--1" />
      <div className="line line--2" />
      <div className="line line--3" />
    </Container>
  );
}
