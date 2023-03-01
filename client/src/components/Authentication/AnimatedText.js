import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";

export default function AnimatedText({ text, imageWidth, imageHeight }) {
  return (
    <Div imageWidth={imageWidth} imageHeight={imageHeight}>
      <div className="dummy">
        <TypeAnimation
          sequence={[1000, text]}
          speed={20}
          className="text"
          cursor={false}
        />
      </div>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  .dummy {
    width: ${({ imageWidth }) => imageWidth + "px"};
    height: ${({ imageHeight }) => imageHeight + "px"};

    position: relative;
  }

  .text {
    font-size: 1.7rem;
    position: absolute;
    bottom: -4.5rem;
    text-align: center;
    color: var(--color-primary);

    /* background-color: red; */
  }
`;
