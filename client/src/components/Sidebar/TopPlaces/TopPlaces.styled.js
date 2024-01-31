import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--color-lightgray);
  padding: 1rem;
  width: 100%;
  height: 23rem;

  display: flex;
  flex-direction: column;

  .title {
    width: 65%;

    color: var(--color-primary);
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--color-primary);
    margin-bottom: 1rem;
    align-self: center;
  }

  .topPlacesContainer {
    display: flex;
    flex-direction: column;
  }
`;
