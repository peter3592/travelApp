import styled from "styled-components";

export const Container = styled.div`
  font-size: 1.7rem;
  font-weight: bold;
  color: var(--color-primary);
  padding: 2rem 2rem;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* background-color: var(--color-lightgray); */
  background-color: #ddd;

  .title {
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    padding-bottom: 1rem;

    border-bottom: 2px solid var(--color-primary);
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 6rem;
    margin-top: 2rem;

    height: 100%;

    gap: 1rem;
  }
`;
