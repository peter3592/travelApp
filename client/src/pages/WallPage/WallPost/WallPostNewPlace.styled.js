import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ breakpoints }) => (!breakpoints.maxWidth500 ? "2rem;" : "1rem;")};
  position: relative;

  .country {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    ${({ breakpoints }) => {
      if (!breakpoints.maxWidth500)
        return `
        height: 2.5rem;
        flex-basis: 2.5rem;
      `;

      return `
        height: 1.8rem;
        flex-basis: 1.8rem;
      `;
    }}

    flex-shrink: 0;
    color: var(--color-blue);
    transform: scale(1.2);
  }

  .strong {
    font-weight: bold;
    text-decoration: none;
    color: var(--color-blue);
    cursor: pointer;
  }

  .imgContainer {
    height: ${({
      breakpoints,
      photoContainerDimension,
      photoContainerDimensionSmall,
    }) =>
      !breakpoints.maxWidth500
        ? `${photoContainerDimension}px;`
        : `${photoContainerDimensionSmall}px;`};

    flex-basis: ${({
      breakpoints,
      photoContainerDimension,
      photoContainerDimensionSmall,
    }) =>
      !breakpoints.maxWidth500
        ? `${photoContainerDimension}px;`
        : `${photoContainerDimensionSmall}px;`};

    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    transition: 0.25s all;

    :hover {
      transform: scale(1.05);
    }

    img {
      transition: 0.4s all;
      width: 100%;
      cursor: pointer;
      ${({ imageCss }) => imageCss};
    }
  }

  .hide {
    opacity: 0;
  }

  .wallLink {
    display: flex;
    align-items: center;
  }

  .postContent {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    flex-wrap: wrap;
  }
`;
