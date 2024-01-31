import styled from "styled-components";

export const LiPlaceComment = styled.li`
  padding: ${({ type }) => (type === "screen" ? "1rem" : "1.5rem 1rem 0")};
  position: relative;
  border-radius: 10px;

  background-color: ${({ type }) =>
    type === "screen" ? "var(--color-comment)" : ""};

  :not(:last-of-type) {
    margin-bottom: ${({ type }) => (type === "screen" ? "1rem" : "0")};

    .mobileLine {
      height: 1px;
    }
  }

  .commentContainer {
    ${({ type }) => {
      if (type === "mobile")
        return `
      display: flex;
      justify-content: flex-start;
      align-items: center;
      `;
    }}
  }

  .commentTop {
    margin-bottom: ${({ type }) => (type === "screen" ? "1.3rem" : "0")};

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon {
    color: red;
    cursor: pointer;
    font-size: 2rem;

    ${({ type }) => {
      if (type === "screen")
        return `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
             `;
    }}
  }

  .commentUser {
    &__details {
      display: flex;
      align-items: center;
    }

    &__photo {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 1rem;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: ${({ type }) =>
        type === "screen" ? "0px 0px 5px 3px var(--color-primary)" : "none"};

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }

    &__name {
      vertical-align: middle;
      font-size: 1.2rem;
      line-height: 1.2rem;
      font-weight: 700;
      cursor: pointer;
      color: ${({ type }) =>
        type === "screen" ? "var(--color-primary)" : "white"};
    }
  }
  .comment {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;

    &__text {
      font-size: 1.35rem;
      color: ${({ type }) =>
        type === "screen" ? "var(--color-darkgray)" : "var(--color-lightgray)"};
      padding-left: 1rem;
    }
  }

  .mobileLine {
    width: 50%;
    margin: 0 auto;
    margin-top: 1.5rem;
    background-color: var(--color-darkgray);
  }
`;
