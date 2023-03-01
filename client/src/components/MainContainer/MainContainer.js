import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../Content/Header/Header";
import { useDataContext, useUIContext } from "../../store/context";
import Place from "../Place/Place";

export default function MainContainer() {
  const { place } = useDataContext();
  const { searchBarViewHandler } = useUIContext();

  return (
    <Wrapper onClick={(e) => searchBarViewHandler(e)}>
      {place && <Place />}
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  background-color: var(--color-primary);
  border: 2rem solid var(--color-primary);
  border-left: 0;
  /* overflow-x: hidden; */
  overflow: hidden;

  width: 100%;
  height: 100%;
`;
