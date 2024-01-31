import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: calc(100% - var(--header-height));
  width: 100%;
  padding: 2rem;
  gap: 2rem;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  overflow: hidden;

  .posts__container {
    height: 100%;
    flex-grow: 1;
    position: relative;

    overflow-x: none;

    display: flex;
    flex-direction: column;

    border-bottom-left-radius: var(--border-radius);

    .noPostTitle {
      color: var(--color-primary);
      font-size: 1.8rem;
      font-weight: bold;
      text-align: center;
    }
  }

  .posts {
    overflow-x: none;
    overflow-y: auto;
    align-self: center;

    width: 100%;
    max-width: 75rem;
    margin-bottom: 2rem;
  }

  .newPlaces__container {
    border-bottom-right-radius: var(--border-radius);
    overflow: hidden;
    width: 18rem;
    flex-shrink: 0;
  }

  .btnContainer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: 1rem;
  }
`;
