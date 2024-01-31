import styled from "styled-components";

export const Mobile = styled.div`
  width: 100%;

  position: relative;
  z-index: 10;

  .exitIcon {
    position: absolute;
    top: 0.65rem;
    right: 0.65rem;
    font-size: 2.2rem;
    cursor: pointer;
    color: white;
  }

  .top {
    background-color: rgb(62, 65, 65);
    padding: 1rem 3rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__details {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__arrow {
      cursor: pointer;
    }

    &__arrowContainer {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 1.8rem;
      transition: all 0.3s;
      z-index: 10;
    }

    .rotated {
      transform: rotateZ(180deg);
    }

    .user {
      height: 100%;
      flex-basis: 10rem;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.5rem;
      color: white;

      &__details {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      &__name {
        font-size: 1rem;
        cursor: pointer;

        &__link {
          text-decoration: none;

          &:visited,
          &:active {
            color: inherit;
          }
        }
      }

      &__photo {
        width: 3rem;
        height: 3rem;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .place {
      height: 100%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      gap: 0.7rem;

      &__name {
        font-size: 1.6rem;
        color: white;
      }

      &__description {
        color: lightgrey;
        text-align: center;
        font-size: 1rem;
        line-height: 1.4rem;
      }
    }

    .icons {
      height: 100%;
      flex-basis: 10rem;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;

      &__comment {
        font-size: 2.3rem;
        color: white;
      }
    }
  }

  .mobileComments {
    width: 100%;
    /* max-height: 50%; */
    transform: ${({ openMobileComments }) =>
      openMobileComments ? "translateY(99%)" : "translateY(-100%)"};
    opacity: ${({ openMobileComments }) => (openMobileComments ? "1" : "0")};
    transition: 0.5s all;
    background-color: rgb(62, 65, 65);

    position: absolute;
    left: 0;
    bottom: 0;

    min-height: 100%;

    /* display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; */
  }

  form {
    position: relative;
    display: flex;
    background-color: var(--color-lightgray);
    align-items: center;
    width: 90%;
    max-width: 40rem;
    margin: 0 auto;
    margin: 2rem auto;
  }

  input.comment {
    width: 100%;
    padding: 1rem 1.2rem;
    padding-right: 0.5rem;
    border: 0;
    outline: none;
    color: black;
    background-color: var(--color-lightgray);

    :-webkit-autofill {
      -webkit-background-clip: text;
      background-clip: text;
    }

    ::placeholder {
      color: var(--color-darkgray);
    }
  }

  .addCommentIcon {
    color: var(--color-primary);
    background-color: var(--color-lightgray);

    position: relative;

    cursor: pointer;

    overflow: hidden;

    height: 100%;
    aspect-ratio: 1 / 1;

    border: none;
    padding: 0;
    margin: 0;
    outline: inherit;

    display: flex;
    justify-content: center;
    align-items: center;

    button {
      height: 140%;
      aspect-ratio: 1 / 1;
      cursor: pointer;

      background-color: var(--color-lightgray);

      transition: all 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      color: var(--color-primary);

      .icon {
        font-size: 1.9rem;
      }
    }
  }

  .heart {
    cursor: pointer;
  }
`;

export const Screen = styled.div`
  background-color: green;
  width: 30%;
  height: 100%;
  position: relative;
  color: white;
  background-color: var(--color-primary);
  padding: 3rem;
  min-width: 22rem;

  display: flex;
  flex-direction: column;

  .sectionTop {
    flex: 0 1 auto;
  }

  .exitIcon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2.5rem;
    cursor: pointer;
  }

  .helperBox {
    display: contents;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;

    &__details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    &__name {
      font-size: 1.4rem;
      font-weight: 700;
      cursor: pointer;

      &__link {
        text-decoration: none;

        &:visited,
        &:active {
          color: inherit;
        }
      }
    }

    &__date {
      color: var(--color-gray);
    }

    &__photo {
      width: 4rem;
      height: 4rem;
      cursor: pointer;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .place {
    &__name {
      width: calc(100% + 2 * 3.1rem);
      transform: translateX(-3.2rem);
      letter-spacing: 2px;
      background-color: ${({ titleColor }) =>
        titleColor ? titleColor.hex : ""};
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      padding: 1.7rem 1rem;
      color: ${({ titleColor }) =>
        titleColor?.isDark ? "white;" : "var(--color-primary)"};
    }

    &__description {
      font-size: 1.4rem;
      font-size: 500;
      color: white;
      margin-top: 1.5rem;
    }
  }

  form {
    position: relative;
    display: flex;
    background-color: var(--color-lightgray);
  }

  input.comment {
    width: 100%;
    padding: 1rem 1.2rem;
    padding-right: 0.5rem;
    border: 0;
    outline: none;
    color: black;
    background-color: var(--color-lightgray);

    :-webkit-autofill {
      -webkit-background-clip: text;
      background-clip: text;
    }

    ::placeholder {
      color: var(--color-darkgray);
    }
  }

  .addCommentIcon {
    color: var(--color-primary);
    background-color: var(--color-lightgray);

    position: relative;

    cursor: pointer;

    overflow: hidden;

    height: 100%;
    aspect-ratio: 1 / 1;

    border: none;
    padding: 0;
    margin: 0;
    outline: inherit;

    display: flex;
    justify-content: center;
    align-items: center;

    button {
      height: 140%;
      aspect-ratio: 1 / 1;
      cursor: pointer;

      background-color: var(--color-lightgray);

      transition: all 0.2s;

      display: flex;
      justify-content: center;
      align-items: center;

      color: var(--color-primary);

      .icon {
        font-size: 1.9rem;
      }

      :hover {
        transform: scale(1) rotate(90deg);
        color: var(--color-secondary);
      }

      :active {
        transform: scale(1) rotate(90deg) translateX(5px);
      }
    }
  }

  .sectionComments {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    overflow-y: auto;

    .form {
      margin-bottom: 1.5rem;
    }
  }

  .heart {
    align-self: center;
  }

  .heartContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem 0;
    flex: 0 1 auto;
  }
`;
