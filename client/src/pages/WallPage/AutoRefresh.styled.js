import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  font-size: 1.7rem;
  gap: 0.7rem;
  font-weight: bold;
  margin-bottom: 1rem;

  cursor: pointer;

  .icon {
    font-size: 2rem;
    &--animation {
      animation: 1s turn forwards cubic-bezier(0.46, 0.34, 0.31, 0.75);
    }
  }

  .iconContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  color: ${({ autoRefresh }) =>
    autoRefresh ? "var(--color-darkgray);" : "var(--color-lightgray);"};

  @keyframes turn {
    from {
      transform: rotate(0) scale(1);
    }

    50% {
      color: var(--color-primary);
    }

    to {
      transform: rotate(-720deg) scale(1);
    }
  }
`;
