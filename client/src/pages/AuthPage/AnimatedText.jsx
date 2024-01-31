import { TypeAnimation } from "react-type-animation";

import { useUIContext } from "../../store/context";
import { Container } from "./AnimatedText.styled";

export default function AnimatedText({ text, imageWidth, imageHeight }) {
  const { breakpoints } = useUIContext();

  return (
    <Container
      imageWidth={imageWidth}
      imageHeight={imageHeight}
      breakpoints={breakpoints}
    >
      <div className="parentImgContainer">
        <TypeAnimation
          sequence={[1000, text]}
          speed={20}
          className="text"
          cursor={false}
        />
      </div>
    </Container>
  );
}
