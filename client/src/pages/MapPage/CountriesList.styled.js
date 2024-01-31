import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  width: 16rem;

  position: absolute;
  top: 0;
  right: 0;

  z-index: 500;

  background-color: rgba(0, 0, 0, 0.72);

  padding-right: 2rem;
  padding-left: 5rem;

  transform: ${({ showList }) =>
    showList ? "none;" : "translateX(calc(100% - 5.5rem));"};
  transition: 0.3s all;

  border-top-right-radius: ${({ breakpoints }) =>
    breakpoints.maxWidth700 ? "0;" : "var(--border-radius);"};
  border-bottom-right-radius: var(--border-radius);

  color: white;

  .container {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .mapUser {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 2rem;

    &__photo {
      width: 4.5rem;
      padding-top: 2rem;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 0.5rem;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__name {
      font-size: 1.4rem;
    }

    &__data {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stats {
      color: white;
      text-align: center;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;
      padding-bottom: 1rem;
      /* border-bottom: 2px solid white; */

      &__title {
        font-size: 0.9rem;
        /* font-weight: 700; */
        margin-bottom: 0.3rem;
        text-align: center;
      }

      &__number {
        font-size: 1.4rem;
        font-weight: 700;
      }

      &__countries,
      &__places {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }

      &__icon {
        font-size: 1.3rem;
      }

      /* &__icon, */
      &__details {
        width: 6.8rem;
      }
    }
  }

  .countriesList {
    height: 100%;
    padding: 2rem 0;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow-y: auto;

    width: 100%;

    /* Hiding scrollbar */
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .countryFlag {
    cursor: pointer;
    transition: all 0.2s;
    list-style: none;

    :hover {
      transform: scale(1.1);
    }
    :not(:last-of-type) {
      margin-bottom: 2rem;
      margin-bottom: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "2rem;" : "1.5rem;"};
    }

    z-index: 501;

    img {
      border-radius: 6px;
    }
  }

  .openList {
    position: absolute;
    border-radius: 10rem;
    top: calc(50% - 1.5rem);
    left: 1.45rem;

    background-color: white;

    z-index: 499;
    width: 2.75rem;
    height: 2.75rem;

    transition: 0.3s all;

    transform: ${({ showList }) =>
      showList ? "rotateZ(180deg);" : "rotateZ(0);"};

    cursor: pointer;

    &__icon {
      width: 100%;
      height: 100%;
      color: var(--color-primary);
    }
  }
`;
