import styled from "styled-components";

export const Container = styled.div`
  .flagSetup {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .flag {
    ${({ breakpoints }) => {
      if (!breakpoints.maxWidth500)
        return `
        width: 9rem;
        height: 6.2rem;
        border: 6px solid var(--color-secondary);
      `;

      return `
        width: calc(9rem * 0.8);
        height: calc(6.2rem * 0.8);
        border: 4px solid var(--color-secondary);
      `;
    }}

    img {
      width: 100%;
      height: 100%;
    }
  }

  .arrow {
    color: var(--color-primary);
    font-size: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "1.5rem;" : "1.15rem;"};
    cursor: pointer;
    transition: all 0.2s;

    display: flex;
    justify-content: center;
    align-items: center;

    &--left {
      transform: rotate(-90deg);
      :hover {
        transform: rotate(-90deg) scale(1.1);
      }
    }
    &--right {
      transform: rotate(90deg);
      :hover {
        transform: rotate(90deg) scale(1.1);
      }
    }
  }
`;
