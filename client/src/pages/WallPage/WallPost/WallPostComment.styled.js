import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ breakpoints }) => (!breakpoints.maxWidth500 ? "2rem;" : "1rem;")};
  position: relative;

  .icon {
    color: var(--color-green);

    ${({ breakpoints }) => {
      if (!breakpoints.maxWidth500)
        return `
        height: 2.5rem;
        width: 2.5rem;
      `;

      return `
        height: 1.8rem;
        width: 1.8rem;
      `;
    }}
  }

  .strong {
    font-weight: bold;
    text-decoration: none;
    color: var(--color-green);
    cursor: pointer;
  }

  .wallLink {
    display: flex;
    align-items: center;
  }

  .postContent {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    flex-wrap: wrap;
  }
`;
