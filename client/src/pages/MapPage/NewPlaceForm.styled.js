import styled from "styled-components";

export const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.8);

  width: 100%;
  height: calc(100% + var(--header-height));

  position: absolute;
  top: calc(-1 * var(--header-height));
  left: 0;

  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--border-radius);

  form {
    background-color: var(--color-lightgray);
    border: 6px solid var(--color-primary);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    padding: 2rem 3rem;

    .textInputs {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .textInput {
      padding: 0.8rem;
      border-radius: 0.5rem;
      border: none;
      outline: none;
      font-size: 1.3rem;
      color: var(--color-primary);

      :not(:last-of-type) {
        margin-bottom: 1.2rem;
      }

      ::placeholder {
        font-size: 1.2rem;
        color: var(--color-gray);
      }
    }

    .country {
      display: flex;
      justify-content: center;
      align-items: center;

      gap: 3rem;

      &__title {
        color: var(--color-primary);
        font-size: 2rem;
        font-weight: bold;
      }

      &__flag {
        width: 8rem;
        height: 5.3rem;

        img {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }
    }

    .coordinate {
      display: flex;
      align-items: center;
      gap: 0.7rem;

      :not(:last-of-type) {
        margin-bottom: 0.7rem;
      }

      &__icon {
        font-size: 1.6rem;
        transform: translateY(2px);
      }

      &__value {
        font-size: 1.6rem;
      }
    }
  }

  .buttonContainer {
    position: relative;
    height: 5.05rem;
  }

  .uploadBtn {
    width: 5rem;
    height: 5rem;

    border-radius: 10rem;
    outline: none;
    border: 5px solid var(--color-primary);

    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;

    position: relative;

    cursor: pointer;

    transition: all 0.3s;

    &--uploaded {
      background-color: var(--color-primary);
    }

    .uploadBtn__icon {
      font-size: 2.2rem;

      &--file {
        color: var(--color-primary);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
      &--check {
        color: white;
        transform: scale(0);
        transition: all 0.3s 0.1s;
      }

      &--visible {
        transform: scale(1);
      }
    }
  }
`;
