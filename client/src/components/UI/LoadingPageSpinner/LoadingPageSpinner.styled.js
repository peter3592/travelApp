import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  display: flex;
  gap: 2rem;

  .dot {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 10rem;
    transform: scale(0);

    &--1 {
      animation: loadingDot 0.7s infinite 0s ease-out;
      background-color: var(--color-blue);
    }
    &--2 {
      animation: loadingDot 0.7s infinite 0.15s ease-out;
      background-color: var(--color-green);
    }
    &--3 {
      animation: loadingDot 0.7s infinite 0.3s ease-out;
      background-color: var(--color-pink);
    }
  }

  @keyframes loadingDot {
    from,
    to {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
`;
