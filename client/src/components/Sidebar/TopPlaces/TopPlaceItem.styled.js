import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  transition: all 1s;
  opacity: ${({ loading }) => (loading ? "0;" : "1;")};
  width: 100%;

  :not(:last-of-type) {
    margin-bottom: 1rem;
  }

  .photo {
    height: ${({ imageContainerHeight }) => imageContainerHeight + "px;"};

    flex-basis: ${({ imageContainerWidth }) => imageContainerWidth + "px;"};
    flex-shrink: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 0.25s all;

    img {
      ${({ imageStyle }) => imageStyle}
      cursor: pointer;
    }

    :hover {
      transform: scale(1.05);
    }
  }

  .details {
    text-align: left;
    flex-grow: 1;
    overflow: hidden;

    .placeName {
      font-size: 1.3rem;
      font-weight: 700;
      text-align: left;
      margin-bottom: 0.5rem;
      cursor: pointer;
    }

    .username {
      font-size: 1rem;
      font-weight: 400;
      text-align: left;
      color: var(--color-darkgray);

      &__link {
        text-decoration: none;
        color: inherit;

        &:active,
        &:visited {
          color: inherit;
        }
      }
    }
  }

  .heartContainer {
    width: 5rem;
    height: 5rem;
  }
`;
