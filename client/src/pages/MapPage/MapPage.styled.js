import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - var(--header-height));

  padding: ${({ breakpoints }) =>
    breakpoints.maxWidth700 ? "1rem 0 0;" : "1rem 4rem 4rem;"};

  position: relative;

  .addPlaceIconContainer {
    background-color: white;
    border-radius: 50%;
    width: 4.2rem;
    height: 4.2rem;
  }

  .addPlaceIcon {
    width: 100%;
    height: 100%;

    color: var(--color-primary);
    cursor: pointer;
    transform: scale(1.2);
    transition: all 0.2s;
    :hover {
      transform: scale(1.25);
    }
  }

  .actionsContainer {
    position: absolute;

    ${({ breakpoints }) =>
      breakpoints.maxWidth700
        ? "top: 2.5rem; left: 1.8rem;"
        : "top: 3rem; left: 6rem;"}

    z-index: 500;
  }

  .mapContainer {
    width: 100%;
    height: 100%;
    position: relative;

    border-radius: var(--border-radius);
    border-top-left-radius: ${({ breakpoints }) =>
      breakpoints.maxWidth700 ? "0;" : "var(--border-radius);"};
    border-top-right-radius: ${({ breakpoints }) =>
      breakpoints.maxWidth700 ? "0;" : "var(--border-radius);"};

    overflow: hidden;
  }

  .button {
    margin-bottom: 1em;

    &--highlighted {
      animation: animationBtn 1s infinite;
    }

    @keyframes animationBtn {
      from,
      to {
        transform: scale(1);
      }

      50% {
        transform: scale(1.1);
      }
    }
  }

  #map {
    width: 100%;
    height: 100%;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    transform: scale(1.05);

    overflow: hidden;

    cursor: ${({ newPlaceMod }) => (newPlaceMod ? "crosshair" : "hand")};
  }
`;
