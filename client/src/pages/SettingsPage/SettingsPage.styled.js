import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - var(--header-height));
  background-color: white;
  padding: 2rem;

  color: black;

  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  display: flex;
  flex-direction: column;

  position: relative;

  .settings__map {
    display: flex;
    user-select: none;
    width: 100%;
    overflow: hidden;

    flex-direction: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "row;" : "column;"};

    gap: 2rem;

    transition: 0.5s all;

    max-height: ${({ expandPlaces, breakpoints }) => {
      if (expandPlaces) return "0;";

      if (breakpoints.maxWidth500) return "21.5rem";

      return "10.5rem;";
    }};
    opacity: ${({ expandPlaces }) => (expandPlaces ? "0;" : "1;")};
  }

  .settings__places {
    flex-grow: 1;
    height: 10rem;
    width: 100%;
    padding: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "3rem 0;" : "2rem 0;"};
    padding-top: ${({ expandPlaces, breakpoints }) => {
      if (expandPlaces) return "0;";

      return !breakpoints.maxWidth500 ? "3rem 0;" : "2rem 0;";
    }};
  }
`;
