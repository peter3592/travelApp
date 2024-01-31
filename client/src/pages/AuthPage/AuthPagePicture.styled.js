import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;

  .picture__container {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    transition: all 2s;

    position: relative;
  }

  .hide {
    opacity: 0;
  }

  .picture__img {
    transition: all 2s;
    position: absolute;
    object-fit: cover;
    ${({ imageStyle }) => imageStyle};
    box-shadow: 0px 0px 15px 10px var(--color-primary);
  }
`;
