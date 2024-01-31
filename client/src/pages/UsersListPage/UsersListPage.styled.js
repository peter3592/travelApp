import styled from "styled-components";

export const Container = styled.div`
  height: calc(100% - var(--header-height));
  padding: 2rem;

  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  display: flex;
  flex-direction: column;

  position: relative;

  .users {
    overflow-y: auto;
    overflow-x: hidden;

    background-color: white;

    &__list {
      display: grid;
      gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(25rem, 25rem));
      justify-content: center;
    }
  }
`;
