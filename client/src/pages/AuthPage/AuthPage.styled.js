import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--color-primary);
  border: 2rem solid var(--color-primary);

  width: 100%;
  height: 100%;

  .title {
    font-family: "Fredoka One", cursive;
    text-align: center;
    color: var(--color-primary);
    position: relative;

    margin-bottom: ${({ breakpoints }) =>
      !breakpoints.maxWidth800 ? "0;" : "2rem;"};

    span {
      color: var(--color-secondary);
    }

    ${({ breakpoints }) => {
      if (breakpoints.maxWidth450)
        return ` 
        font-size: 4rem;
        `;
      if (breakpoints.maxWidth800)
        return ` 
        font-size: 5rem;
        `;

      if (breakpoints.maxWidth1000)
        return ` 
      font-size: 6rem;
        `;

      return ` 
      font-size: 7.5rem;
        `;
    }}
  }

  .wrapper {
    width: 100%;
    height: 100%;

    border-radius: var(--border-radius);
    display: flex;
    overflow: hidden;
    background: white;
    padding: ${({ breakpoints }) =>
      !breakpoints.maxWidth800 ? "4rem;" : "1rem 4rem;"};
    flex-direction: row;

    ${({ breakpoints }) => {
      if (breakpoints.maxWidth800)
        return ` 
        flex-direction: column;
        align-items: center;
        `;
    }}

    .auth {
      width: 100%;
      display: flex;
      flex-direction: column;

      &__container {
        flex-grow: 1;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .pictures {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      ${({ breakpoints }) => {
        if (breakpoints.maxWidth800) return "padding: 4rem 0 6rem 0;";
        if (breakpoints.maxWidth900) return "padding: 1.5rem 0 1.5rem 4rem;";
        if (breakpoints.maxWidth1000) return "padding: 3rem 4rem;";

        return "padding: 6rem 8rem;";
      }}
    }
  }
`;
