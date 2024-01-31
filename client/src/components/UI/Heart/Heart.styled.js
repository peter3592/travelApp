import styled from "styled-components";

export const Container = styled.div`
  width: ${({ size }) => (size === "big" ? "8rem;" : "5rem;")};
  height: ${({ size }) => (size === "big" ? "8rem;" : "5rem;")};

  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-heart);
  position: relative;
  user-select: none;

  .icon {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    cursor: ${({ noPointer }) => (noPointer ? "normal;" : "pointer;")};

    &__white {
      color: white;
    }

    &__animated {
      &--1 {
        animation: anim1 1s;
      }

      &--2 {
        animation: anim2 1s 0.2s;
      }
    }
  }

  p {
    color: ${({ highlighted }) =>
      highlighted ? "white;" : "var(--color-heart);"};
    font-size: ${({ size }) => (size === "big" ? "1.9rem;" : "1.2rem;")};
    transform: translateY(-2px);
    cursor: ${({ noPointer }) => (noPointer ? "normal;" : "pointer;")};
  }

  @keyframes anim1 {
    from {
      transform: scale(1);
      opacity: 1;
    }
    99% {
      transform: scale(1.5);
      opacity: 0;
    }
    to {
      transform: scale(0);
    }
  }

  @keyframes anim2 {
    from {
      transform: scale(1);
      opacity: 1;
    }
    99% {
      transform: scale(1.7);
      opacity: 0;
    }
    to {
      transform: scale(0);
    }
  }
`;
