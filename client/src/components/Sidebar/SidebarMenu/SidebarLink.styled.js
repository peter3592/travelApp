import styled from "styled-components";
import { Link } from "react-router-dom";

export const MyLink = styled(Link)`
  color: ${({ active, breakpoints }) =>
    active && !breakpoints.maxWidth1000 ? "var(--color-primary);" : "white;"};
  position: relative;
  padding: 1rem 2.5rem;
  width: 100%;

  :not(:last-of-type) {
    margin-bottom: 1rem;
  }

  .linkContainer {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .icon {
    font-size: 2.5rem;
    z-index: 2;
    margin-right: 1rem;
    transform: translateY(2px);
    transition: transform 0.2s;
  }

  :hover {
    .icon {
      transform: ${({ active }) =>
        active ? "translateY(2px)" : "translateY(2px) scale(1.1)"};
    }
  }

  .text {
    font-size: 1.7rem;
    z-index: 2;
  }

  .active {
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;

    width: 24.6rem;
    height: 100%;

    border-top-left-radius: 10rem;
    border-bottom-left-radius: 10rem;

    z-index: 1;

    &__rightRadius {
      position: absolute;

      width: 3rem;
      height: 3rem;
      background-color: white;

      overflow: hidden;

      &__circle {
        width: 200%;
        height: 200%;
        border-radius: 10rem;
        background-color: var(--color-primary);
        transform: translateX(-1px);
        cursor: default;

        position: absolute;
        top: 0;
        right: 0;

        &--top {
          transform: translateX(-1px) translateY(-50%);
        }
      }

      &--top {
        top: -3rem;
        right: 0;
      }
      &--bottom {
        bottom: -3rem;
        right: 0;
      }
    }
  }
`;
