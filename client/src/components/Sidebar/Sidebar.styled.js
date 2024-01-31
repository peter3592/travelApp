import styled from "styled-components";

export const Container = styled.div`
  ${({ breakpoints }) => {
    if (breakpoints.maxWidth1000) return "";

    return "width: var(--sidebar-width);";
  }}
  height: 100%;

  background-color: var(--color-primary);

  display: flex;
  align-items: center;
  flex-direction: column;

  transition: 0.3s all;

  ${({ breakpoints, showSidebar }) => {
    if (breakpoints.maxWidth1000) {
      if (showSidebar) return `position: absolute; z-index: 10;`;

      if (!showSidebar)
        return `position: absolute; z-index: 10; transform: translateX(-100%);`;
    }
  }}

  .logo {
    display: block;
    color: white;
    font-family: "Fredoka One", cursive;
    font-size: 3.5rem;
    text-align: center;
    margin-bottom: 3rem;
    text-decoration: none;

    span {
      color: var(--color-secondary);
    }
  }
`;
