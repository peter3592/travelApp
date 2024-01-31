import { useDataContext, useUIContext } from "../store/context";
import Place from "../components/Place/Place";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { ContentContainer, Container } from "./MainContainer.styled";

export function MainContainer({ sidebarType, component }) {
  const { place } = useDataContext();
  const { searchBarViewHandler, breakpoints } = useUIContext();

  return (
    <Container
      onClick={(e) => searchBarViewHandler(e)}
      breakpoints={breakpoints}
    >
      {place && <Place />}
      <Sidebar type={sidebarType} />
      <ContentContainer breakpoints={breakpoints}>
        <Header />
        {component}
      </ContentContainer>
    </Container>
  );
}
