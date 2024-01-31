import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  input {
    width: 20rem;
    padding: 1.1rem 0.8rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    font-size: 1.3rem;
    background-color: var(--color-light-blue);
    color: var(--color-primary);
  }

  .imgContainer {
    width: 10rem;
    height: 10rem;
    position: relative;
    margin: 0.5rem 0 2.5rem;

    align-self: center;
    cursor: pointer;
    box-shadow: 0px 0px 6px 4px var(--color-primary);

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
