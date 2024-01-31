import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: ${({ minSearchBar }) => (minSearchBar ? "3.7rem;" : "20rem;")};
  z-index: 1000;

  cursor: ${({ minSearchBar }) => (minSearchBar ? "pointer;" : "auto;")};

  label {
    cursor: inherit;
  }

  input {
    width: 100%;
    border-radius: 10rem;
    background-color: #ddd;
    border: 0;
    outline: none;
    padding: 1rem 0.7rem;
    padding-left: 3rem;
    color: var(--color-primary);
    font-size: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "1.2rem;" : "1.1rem;"};

    cursor: inherit;

    ::placeholder {
      color: var(--color-gray);
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1.2rem;" : "1.1rem;"};
    }
  }

  .results {
    width: 100%;
    max-height: 25rem;
    position: absolute;
    top: 100%;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;

    &__topPart {
      width: 100%;
      height: 2rem;
      background-color: #ddd;
      position: absolute;
      top: 1.6rem;
      left: 0;

      z-index: -1;
    }
  }
`;
