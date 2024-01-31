import styled from "styled-components";

export const Container = styled.ul`
  overflow-y: auto;
  overflow-x: hidden;

  background-color: inherit;

  max-height: ${({ type }) => (type === "mobile" ? "30rem" : "auto")};
`;
