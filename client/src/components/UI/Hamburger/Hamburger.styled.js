import styled from "styled-components";

export const Container = styled.div`
  ${({ breakpoints }) =>
    !breakpoints.maxWidth500
      ? "width: 2.6rem; height: 2.6rem;"
      : "width: 2.1rem; height: 2.1rem;"};

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  .line {
    background-color: var(--color-primary);
    height: 3px;
    width: 100%;
  }
`;
