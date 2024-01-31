import styled from "styled-components";

export const LiUsersList = styled.li`
  display: flex;

  .left {
    flex: 0 0 9rem;
    background-color: var(--color-lightgray);
    position: relative;

    .heartContainer {
      width: 6rem;
      height: 6rem;

      position: absolute;
      right: 0;
      top: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "9.25rem;" : "6rem;"};

      display: flex;
      justify-content: center;
      align-items: center;

      &__title {
        position: absolute;
        bottom: -4px;
        color: var(--color-darkgray);
        font-size: 0.9rem;
      }
    }

    .photoContainer {
      ${({ breakpoints }) => {
        if (!breakpoints.maxWidth500)
          return `
          width: 6rem;
          height: 6rem;

          position: absolute;
          top: 1.5rem;
          right: 0;
        `;

        return `
          width: 4rem;
          height: 4rem;

          position: absolute;
          top: 1rem;
          left: 4rem;
        `;
      }};

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right {
    flex-grow: 1;
    background-color: var(--color-lightgray);
    text-align: center;
    padding-bottom: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "2rem;" : "1rem;"};

    .username {
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1.6rem;" : "1.2rem;"};
      font-family: "Fredoka One";
      letter-spacing: 1px;

      color: white;

      display: flex;
      justify-content: center;
      align-items: center;
      line-height: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "4rem;" : "3rem;"};
    }

    .details {
      padding: 2rem 2rem 1.5rem;
      color: var(--color-primary);
      text-align: center;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;

      .title {
        font-size: ${({ breakpoints }) =>
          !breakpoints.maxWidth500 ? "1rem;" : "0.8rem;"};
        margin-bottom: 0.5rem;
      }

      .value {
        font-size: ${({ breakpoints }) =>
          !breakpoints.maxWidth500 ? "1.7rem;" : "1.4rem;"};
        font-weight: bold;
      }
    }
  }

  .topLevel {
    height: 4.5rem;
    height: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "4.5rem;" : "3rem;"};
    background-color: var(--color-primary);
  }
`;
