import styled from "styled-components";
import { newColorShade } from "../../utils";

export const PlaceBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  padding: ${({ breakpoints }) => (!breakpoints.maxWidth800 ? "4rem" : "0")};

  .container {
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    transition: 0.3s opacity;

    flex-direction: ${({ breakpoints }) =>
      !breakpoints.maxWidth800 ? "row;" : "column-reverse;"};

    opacity: ${({ loading }) => (loading ? "0;" : "1;")};

    position: relative;

    &__photo {
      background: ${({ containerColor }) => {
        if (!containerColor) return "";

        return `linear-gradient(
        90deg,
        ${newColorShade(
          containerColor.hex,
          containerColor.isLight ? -40 : 40
        )} 15%,
        ${containerColor.hex} 100%
      );`;
      }};

      padding: 3rem;

      width: ${({ breakpoints }) =>
        !breakpoints.maxWidth800 ? "70%" : "100%"};
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      flex-grow: 1;
      z-index: -2;

      img {
        object-fit: cover;
        transition: 0.6s all;
        ${({ imageStyle }) => imageStyle}
      }
    }
  }

  .hide {
    opacity: 0;
    transform: scale(0.4);
  }
`;
