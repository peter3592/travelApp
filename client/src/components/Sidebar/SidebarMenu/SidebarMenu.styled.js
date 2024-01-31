import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  flex-grow: 1;
  width: 100%;
  padding: ${({ breakpoints }) =>
    breakpoints.maxWidth1000 ? "0;" : "0 2rem;"};

  position: relative;

  .mobileBtnContainer {
    position: absolute;
    top: 0;
    left: calc(50% - 1rem);
    transform: translateX(-50%);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    width: 13rem;
  }

  .closeIcon {
    color: white;
    font-size: 5rem;
    cursor: pointer;
  }

  .menuContainer {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    width: 100%;
  }
`;
