import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  .parentImgContainer {
    width: ${({ imageWidth }) => imageWidth + "px"};
    height: ${({ imageHeight }) => imageHeight + "px"};

    position: relative;
  }

  .text {
    font-size: ${({ breakpoints }) => {
      if (breakpoints.maxWidth400) return "1.3rem;";
      if (breakpoints.maxWidth550) return "1.4rem;";
      if (breakpoints.maxWidth800) return "1.5rem;";

      return "1.7rem;";
    }};
    position: absolute;
    bottom: -4.5rem;
    text-align: center;
    color: var(--color-primary);
  }
`;
