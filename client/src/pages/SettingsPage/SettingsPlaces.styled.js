import styled from "styled-components";

export const Title = styled.p`
  font-size: 1.5rem;
  color: var(--color-gray);
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns:
    5rem minmax(10rem, max-content) 1fr minmax(10rem, max-content)
    max-content;
  grid-template-columns: ${({ breakpoints }) =>
    !breakpoints.maxWidth500
      ? `5rem minmax(10rem, max-content) 1fr minmax(10rem, max-content)
         max-content;`
      : `3.5rem minmax(10rem, max-content) 1fr 1fr
         max-content;`};

  justify-items: center;
  align-items: center;

  padding: 0 2rem;

  .row {
    width: 100%;
    height: 100%;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "1rem;" : "0.6rem;"};

    font-size: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "1rem;" : "0.85rem;"};

    background-color: var(--color-grid-row);

    border-bottom: 1px solid var(--color-lightgray);

    .trash {
      &__container {
        background-color: transparent;
        width: 1.65rem;
        height: 2.1rem;

        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);

        cursor: pointer;
      }

      &__icon {
        color: var(--color-red);
        font-size: ${({ breakpoints }) =>
          !breakpoints.maxWidth500 ? "1.7rem;" : "1.4rem;"};
        cursor: pointer;
        z-index: 0;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }

    &--flag {
      ${({ breakpoints }) => {
        if (breakpoints.maxWidth500)
          return `
          padding-right: 0 !important;
          padding-left: 0 !important;
          `;
      }};
    }

    &--first {
      font-family: "Fredoka One";
      letter-spacing: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1px;" : "0.75px;"};
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1.3rem;" : "1rem;"};
      background-color: var(--color-lightgray);
      color: var(--color-darkgray);
      padding: 1rem 0.5rem;

      &--flag,
      &--trash {
        padding-left: 0;
        padding-right: 0;
      }
    }

    &--trash {
      width: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "5rem;" : "3rem;"};
      height: 100%;
      padding: 0;
      position: relative;
    }

    &--coords {
      flex-direction: column;
      font-family: monospace;
    }
  }

  .place {
    &__name {
      cursor: pointer;
      :hover {
        background-color: var(--color-grid-row-hover);
      }
    }
  }

  .flagContainer {
    width: 3rem;
    height: 2rem;

    ${({ breakpoints }) => {
      if (!breakpoints.maxWidth500) return "width: 3rem; height: 2rem;";

      return "width: 2rem; height: 1.33rem;";
    }};

    text-align: center;
    margin: 0 auto;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
