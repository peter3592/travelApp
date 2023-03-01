import styled from "styled-components";

export default function Content({ children }) {
  return <Div>{children}</Div>;
}

const Div = styled.div`
  width: calc(100% - var(--sidebar-width));

  display: flex;
  flex-direction: column;

  background-color: white;

  border-radius: var(--border-radius);

  z-index: 5;

  position: relative;

  /* overflow: hidden; */
`;
