import styled from "styled-components";

export const Container = styled.div`
  min-width: 24rem;
  max-width: 35rem;
  min-height: 7.5rem;
  color: white;

  z-index: 99999999;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 50%;

  font-size: 1.7rem;

  transition: 0.3s all;

  transform: ${({ showModal }) => {
    if (showModal) return "translateX(-50%) translateY(-5px)";

    return "translateX(-50%) translateY(-100%)";
  }};

  .center {
    height: 100%;
    border: 5px solid transparent;
    padding: 1rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;

    &--success {
      background-color: var(--color-secondary);
    }

    &--info {
      background-color: var(--color-blue-info);
    }

    &--error {
      background-color: var(--color-red);
    }
  }

  .container__icon {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .icon {
    font-size: 2.5rem;
  }
`;
