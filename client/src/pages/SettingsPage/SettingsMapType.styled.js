import styled from "styled-components";

export const Container = styled.div`
  .images {
    display: flex;
    gap: 2rem;
  }

  .image {
    ${({ breakpoints }) => {
      if (!breakpoints.maxWidth500)
        return `
        width: 9rem;
        height: 6.2rem;
        border: 6px solid transparent;
      `;

      return `
        width: calc(9rem * 0.8);
        height: calc(6.2rem * 0.8);
        border: 4px solid transparent;
      `;
    }}

    cursor: pointer;
    transition: all 0.2s;

    :hover:not(.image--chosen) {
      border: 0 solid var(--color-secondary-light);
      border-width: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "6px;" : "4px;"};
    }

    &--chosen {
      border: 0 solid var(--color-secondary);
      border-width: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "6px;" : "4px;"};
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
