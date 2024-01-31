import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3rem;
  user-select: none;

  font-family: "Fredoka One";
  letter-spacing: 0.5px;
  font-size: 1.4rem;

  margin-bottom: ${({ breakpoints, showFilterItems }) =>
    !breakpoints.maxWidth550 || showFilterItems ? "3rem;" : "0;"};

  .title {
    color: var(--color-gray);
  }

  .filterActivationIcon {
    font-size: 2.7rem;
    color: var(--color-darkgray);
    cursor: pointer;
    transition: 0.2s all;

    :hover {
      transform: scale(1.05);
    }
  }

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-lightgray);

    transition: 0.3s all;

    &__items {
      display: flex;

      ${({ breakpoints }) => {
        if (breakpoints.maxWidth550)
          return `
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        `;

        return `      
          gap: 3rem;
        `;
      }}
    }

    &__text {
      cursor: pointer;
      padding-left: 0.5rem;
    }

    &__icon {
      transition: 0.2s all;
      transform: scale(0);

      display: flex;
      justify-content: center;
      align-items: center;
      /* cursor: default; */

      &--active {
        transform: scale(1);
        cursor: pointer;
      }
    }

    input {
      display: none;
    }

    &--newPlaces {
      color: var(--color-primary);
    }

    &--comments {
      color: #02ca2e;
    }

    &--likes {
      color: #fa00ff;
    }
  }
`;
