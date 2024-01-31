import styled from "styled-components";

export const Container = styled.div`
  color: black;

  user-select: none;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: ${({ breakpoints }) =>
    !breakpoints.maxWidth500 ? "1.4rem;" : "0.7rem;"};

  .title {
    display: flex;
    align-items: center;
    gap: 1rem;

    &__text {
      text-align: center;
      font-weight: bold;
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1.5rem;" : "1.1rem;"};
      color: var(--color-primary);
      font-family: "Fredoka One";
      letter-spacing: 1px;
    }

    &__icon {
      cursor: pointer;
      transition: 0.15s all;
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1.7rem;" : "1.4rem;"};

      &--expand {
        :hover {
          transform: scale(1.2);
        }
      }
      &--collapse {
        transform: scale(1.3);

        :hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .container {
    flex-grow: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    ${({ type }) => {
      if (type === "places")
        return "overflow-y: auto; overflow-x: hidden; align-items: flex-start;";

      return "overflow: hidden;";
    }}
  }
`;
