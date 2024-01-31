import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  background-color: #ddd;
  padding: 1rem 1rem;
  color: var(--color-darkgray);

  border-top: 2px solid white;

  transition: 0.2s all;

  :hover {
    background-color: #eee;
  }

  .icon {
    ${({ breakpoints }) =>
      !breakpoints.maxWidth500
        ? "height: 2rem; flex-basis: 2rem;"
        : "height: 1.4rem; flex-basis: 1.4rem;"};

    color: var(--color-primary);
    flex-shrink: 0;
  }

  .photo {
    ${({ breakpoints }) =>
      !breakpoints.maxWidth500
        ? "height: 3rem; flex-basis: 3rem;"
        : "height: 2.2rem; flex-basis: 2.2rem;"};

    margin: 0 1rem;

    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      image-resolution: 20dpi;
    }
  }

  .name {
    font-size: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "1.4rem;" : "1.1rem;"};
  }

  span {
    font-weight: bold;
    color: var(--color-primary);
  }
`;
