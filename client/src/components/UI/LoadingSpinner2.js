import styled from "styled-components";
import { HiOutlineRefresh } from "react-icons/hi";

export default function LoadingSpinner2() {
  return (
    <Div>
      <HiOutlineRefresh className="icon" />
    </Div>
  );
}

const Div = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  /* display: flex;
  gap: 2rem; */

  .icon {
    animation: rotate 1s infinite linear;
    font-size: 3rem;
    color: var(--color-primary);
  }

  /* .dot {
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
  } */

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
