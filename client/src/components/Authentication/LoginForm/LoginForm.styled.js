import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

    :last-of-type {
      margin-bottom: 1rem;
    }
  }
`;
