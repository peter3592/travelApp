import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  input {
    width: 17.75rem;
    padding: 1.25rem 3.5rem 1.25rem 2rem;
    border-radius: 10rem;
    border: 3px solid var(--color-gray);
    outline: none;
    font-size: 1.3rem;
    color: var(--color-primary);
    background-color: var(--color-findPlace);

    :not(:last-of-type) {
      margin-bottom: 1.2rem;
    }

    ::placeholder {
      font-size: 1.2rem;
      color: var(--color-gray);
    }
  }

  .iconContainer {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.8rem;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .iconGlass {
    color: var(--color-gray);
    color: var(--color-primary);
    cursor: pointer;
    transition: 0.2s all;

    :hover {
      transform: scale(1.15);
    }
  }
`;
