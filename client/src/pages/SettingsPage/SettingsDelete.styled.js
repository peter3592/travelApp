import styled from "styled-components";

export const Container = styled.div`
  border-top: 0 solid var(--color-red);
  border-top-width: ${({ breakpoints }) =>
    !breakpoints.maxWidth500 ? "3px;" : "2px;"};
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  max-width: 50rem;
  margin: 0 auto;

  .passwordContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    height: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "5.1rem;" : "3.06rem;"};

    input {
      padding: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1.1rem 0.8rem;" : "0.6rem 0.4rem;"};
      border-radius: 0.5rem;
      border: none;
      outline: none;
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1.3rem;" : "1rem;"};
      background-color: var(--color-light-blue);
      color: var(--color-primary);
    }

    .buttons {
      display: flex;
      gap: 1rem;
    }

    .icon {
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "2.6rem;" : "2rem;"};
      cursor: pointer;
      transition: all 0.1s;

      :hover {
        transform: scale(1.05);
      }

      :active {
        transform: translateY(2px) scale(1);
      }

      &--submit {
        color: var(--color-secondary);
      }

      &--cancel {
        color: var(--color-red);
      }
    }
  }
`;
