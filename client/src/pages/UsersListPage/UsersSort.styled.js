import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ breakpoints }) => (breakpoints.maxWidth450 ? "1.5rem;" : "3rem;")};

  font-family: "Fredoka One";
  letter-spacing: 0.5px;

  margin-bottom: 3rem;

  font-size: 1.4rem;

  .title {
    color: var(--color-gray);
  }

  .sort__items {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: ${({ breakpoints }) => (breakpoints.maxWidth450 ? "1rem;" : "3rem;")};
  }

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-lightgray);
    user-select: none;

    transition: 0.3s all;

    &__text {
      cursor: pointer;
      padding-left: ${({ breakpoints }) =>
        breakpoints.maxWidth450 ? "0.15rem;" : "0.5rem;"};
    }

    &__icon {
      transition: 0.2s opacity;
      transform: scale(0);
      opacity: 0;
      font-size: 2.2rem;

      display: flex;
      justify-content: center;
      align-items: center;

      transition: 0.3s all;

      &--active {
        transform: scale(1);
        opacity: 1;
        cursor: pointer;

        &--asc {
          transform: rotate(180deg);
        }
      }
    }

    input {
      display: none;
    }

    &--active {
      color: var(--color-primary);
    }

    .sortHide {
      width: 0;
    }
  }
`;
