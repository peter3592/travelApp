import styled from "styled-components";

export const Container = styled.div`
  :not(:last-of-type) {
    margin-bottom: 1.2rem;
  }

  line-height: 20px;

  .container {
    ${({ type }) => {
      if (type === "newPlace")
        return ` 
      background-color: var(--color-light-blue);
      border-color:  var(--color-blue);
      `;

      if (type === "comment")
        return ` 
      background-color: var(--color-light-green);
      border-color:  var(--color-green);
      `;

      if (type === "like")
        return ` 
        background-color: var(--color-light-pink);
        border-color:  var(--color-pink);
      `;
    }}

    border-width: 0.6rem;
    border-style: solid;

    border-top-width: 0;
    border-bottom-width: 0;
    border-right-width: 0;

    padding: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "1rem;" : "0.7rem 1rem;"};
    font-size: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "1.3rem;" : "1.1rem;"};

    border-radius: 5px;
  }

  .date {
    font-size: 1rem;
    color: var(--color-gray);
  }

  .photoContainer {
    width: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "2.4rem;" : "1.8rem;"};
    height: ${({ breakpoints }) =>
      !breakpoints.maxWidth500 ? "2.4rem;" : "1.8rem;"};

    border-radius: 50%;

    overflow: hidden;
    margin: 0 0.3rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
