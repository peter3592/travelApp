import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  height: var(--header-height);

  padding: ${({ breakpoints }) => {
    if (breakpoints.maxWidth800) return "0 2.5rem 0 8rem;";
    if (breakpoints.maxWidth1000) return "0 4rem 0 8rem;";

    return "0 8rem;";
  }};

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  position: relative;

  .hamburger {
    position: absolute;
    top: 50%;
    left: 3rem;
    transform: translateY(-50%);
  }

  .search {
    position: relative;

    input {
      border-radius: 10rem;
      background-color: #ddd;
      border: 0;
      outline: none;
      padding: 0.7rem;
      padding-left: 3rem;
      color: var(--color-darkgray);

      ::placeholder {
        color: var(--color-gray);
        font-size: 1.2rem;
      }
    }
  }

  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${({ breakpoints }) => {
      if (breakpoints.maxWidth800) return "1.5rem";

      return "2.5rem;";
    }};

    &__name {
      font-weight: bold;
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "1.7rem;" : "1.45rem;"};

      &__link {
        text-decoration: none;

        &:visited {
          color: inherit;
        }
      }
    }

    &__photo {
      ${({ breakpoints }) =>
        !breakpoints.maxWidth500
          ? "width: 4rem; height: 4rem;"
          : "width: 3.3rem; height: 3.3rem;"};

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .icon {
    &__glass {
      position: absolute;
      top: 50%;
      left: ${({ minSearchBar }) => (minSearchBar ? "30%;" : "5%;")};
      transform: translateY(-50%);
      font-size: 1.5rem;
      color: var(--color-gray);
    }
    &__logout {
      font-size: ${({ breakpoints }) =>
        !breakpoints.maxWidth500 ? "2.5rem;" : "2rem;"};
      color: red;
      cursor: pointer;
      transition: all 0.2s;

      :hover {
        transform: scale(1.1);
      }
    }
  }
`;
