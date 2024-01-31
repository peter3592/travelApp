import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: var(--color-primary);
  border: 2rem solid var(--color-primary);

  border-left: ${({ breakpoints }) =>
    breakpoints.maxWidth1000 ? "2rem solid var(--color-primary);" : "0;"};
  overflow: hidden;

  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.div`
  ${({ breakpoints }) => {
    if (breakpoints.maxWidth1000) return "width: 100%;";

    return "width: calc(100% - var(--sidebar-width));";
  }}

  display: flex;
  flex-direction: column;
  position: relative;

  background-color: white;
  border-radius: var(--border-radius);
  z-index: 5;
`;
