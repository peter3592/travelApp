import styled from "styled-components";

export const Container = styled.div`
  .recentPlace__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: all 1s;
  }

  .hide {
    opacity: 0;
    transform: translateY(1rem);
  }

  .link {
    text-decoration: none;
    color: inherit;

    &:active,
    &:visited {
      color: inherit;
    }
  }

  .author {
    background-color: lavender;
    padding: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;

    &__name {
      font-size: 1.25rem;
    }

    &__photo {
      width: 3rem;
      height: 3rem;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .place {
    height: 8.5rem;
    width: 11.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    transition: 0.25s all;

    :hover {
      transform: scale(1.05);
    }

    &__photo {
      height: 100%;
      cursor: pointer;
    }
  }
`;
